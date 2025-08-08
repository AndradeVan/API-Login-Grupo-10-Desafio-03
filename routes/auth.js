const express = require('express');
const bcrypt = require('bcryptjs');
const userService = require('../data/users');
const jwtUtils = require('../utils/jwt');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Email do usuário
 *           example: "admin@teste.com"
 *         password:
 *           type: string
 *           description: Senha do usuário
 *           example: "password"
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Email do usuário
 *           example: "novo@teste.com"
 *         password:
 *           type: string
 *           description: Senha do usuário
 *           example: "minhasenha123"
 *     ForgotPasswordRequest:
 *       type: object
 *       required:
 *         - email
 *         - newPassword
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Email do usuário
 *           example: "admin@teste.com"
 *         newPassword:
 *           type: string
 *           description: Nova senha do usuário
 *           example: "novasenha123"
 *     LoginResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Login realizado com sucesso"
 *         token:
 *           type: string
 *           description: Token JWT para autenticação
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             email:
 *               type: string
 *               example: "admin@teste.com"
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "Usuário ou senha inválidos, tente novamente"
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Realizar login do usuário
 *     description: Autentica um usuário com email e senha, retornando um token JWT
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Usuário ou senha inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       423:
 *         description: Usuário bloqueado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Validação dos campos obrigatórios
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email e senha são obrigatórios'
    });
  }

  // Buscar usuário
  const user = userService.findByEmail(email);
  
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Usuário ou senha inválidos, tente novamente'
    });
  }

  // Verificar se usuário está bloqueado
  if (user.blocked) {
    return res.status(423).json({
      success: false,
      message: 'Usuário bloqueado devido a múltiplas tentativas de login inválidas'
    });
  }

  // Verificar senha
  const isValidPassword = bcrypt.compareSync(password, user.password);
  
  if (!isValidPassword) {
    // Atualizar tentativas de login
    userService.updateLoginAttempts(email, false);
    
    // Verificar se o usuário foi bloqueado após esta tentativa
    const updatedUser = userService.findByEmail(email);
    if (updatedUser && updatedUser.blocked) {
      return res.status(423).json({
        success: false,
        message: 'Usuário bloqueado devido a múltiplas tentativas de login inválidas'
      });
    }
    
    return res.status(401).json({
      success: false,
      message: 'Usuário ou senha inválidos, tente novamente'
    });
  }

  // Login bem-sucedido - resetar tentativas
  userService.updateLoginAttempts(email, true);

  // Gerar token JWT
  const token = jwtUtils.generateToken(user.id, user.email);

  res.json({
    success: true,
    message: 'Login realizado com sucesso',
    token,
    user: {
      id: user.id,
      email: user.email
    }
  });
});

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Criar novo usuário
 *     description: Registra um novo usuário no sistema
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Usuário criado com sucesso"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 4
 *                     email:
 *                       type: string
 *                       example: "novo@teste.com"
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Email já existe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/register', (req, res) => {
  const { email, password } = req.body;

  // Validação dos campos obrigatórios
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email e senha são obrigatórios'
    });
  }

  // Validação básica de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Formato de email inválido'
    });
  }

  // Validação de senha (mínimo 6 caracteres)
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'A senha deve ter pelo menos 6 caracteres'
    });
  }

  // Verificar se email já existe
  if (userService.emailExists(email)) {
    return res.status(409).json({
      success: false,
      message: 'Email já cadastrado'
    });
  }

  // Criar novo usuário
  const newUser = userService.create(email, password);

  res.status(201).json({
    success: true,
    message: 'Usuário criado com sucesso',
    user: {
      id: newUser.id,
      email: newUser.email
    }
  });
});

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Trocar senha do usuário
 *     description: Permite que o usuário troque sua senha fornecendo o email correto
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPasswordRequest'
 *     responses:
 *       200:
 *         description: Senha alterada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Senha alterada com sucesso"
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/forgot-password', (req, res) => {
  const { email, newPassword } = req.body;

  // Validação dos campos obrigatórios
  if (!email || !newPassword) {
    return res.status(400).json({
      success: false,
      message: 'Email e nova senha são obrigatórios'
    });
  }

  // Validação de senha (mínimo 6 caracteres)
  if (newPassword.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'A nova senha deve ter pelo menos 6 caracteres'
    });
  }

  // Verificar se usuário existe
  const user = userService.findByEmail(email);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'Usuário não encontrado'
    });
  }

  // Resetar senha
  const success = userService.resetPassword(email, newPassword);

  if (success) {
    res.json({
      success: true,
      message: 'Senha alterada com sucesso'
    });
  } else {
    res.status(500).json({
      success: false,
      message: 'Erro ao alterar senha'
    });
  }
});

/**
 * @swagger
 * /api/auth/users:
 *   get:
 *     summary: Listar usuários (apenas para debug)
 *     description: Retorna lista de todos os usuários cadastrados
 *     tags: [Debug]
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       email:
 *                         type: string
 *                       blocked:
 *                         type: boolean
 *                       loginAttempts:
 *                         type: integer
 */
router.get('/users', (req, res) => {
  const users = userService.getAll();
  res.json({
    success: true,
    users
  });
});

/**
 * @swagger
 * /api/auth/unblock:
 *   post:
 *     summary: Desbloquear usuário
 *     description: Remove o bloqueio de um usuário fornecendo seu email
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email do usuário a ser desbloqueado
 *                 example: "admin@teste.com"
 *     responses:
 *       200:
 *         description: Usuário desbloqueado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Usuário desbloqueado com sucesso"
 *       400:
 *         description: Email não fornecido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/unblock', (req, res) => {
  const { email } = req.body;

  // Validação do campo obrigatório
  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Email é obrigatório'
    });
  }

  // Verificar se usuário existe
  const user = userService.findByEmail(email);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'Usuário não encontrado'
    });
  }

  // Desbloquear usuário
  const success = userService.unblockUser(email);

  if (success) {
    res.json({
      success: true,
      message: 'Usuário desbloqueado com sucesso'
    });
  } else {
    res.status(500).json({
      success: false,
      message: 'Erro ao desbloquear usuário'
    });
  }
});

module.exports = router; 