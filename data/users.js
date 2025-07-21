const bcrypt = require('bcryptjs');

// Dados mockados dos usuários
let users = [
  {
    id: 1,
    email: 'admin@teste.com',
    password: bcrypt.hashSync('123456', 10), // senha fácil para testes
    blocked: false,
    loginAttempts: 0,
    lastLoginAttempt: null
  },
  {
    id: 2,
    email: 'usuario@teste.com',
    password: bcrypt.hashSync('123456', 10), // senha fácil para testes
    blocked: false,
    loginAttempts: 0,
    lastLoginAttempt: null
  },
  {
    id: 3,
    email: 'teste@teste.com',
    password: bcrypt.hashSync('123456', 10), // senha fácil para testes
    blocked: false,
    loginAttempts: 0,
    lastLoginAttempt: null
  }
];

// Funções para gerenciar usuários
const userService = {
  // Buscar usuário por email
  findByEmail: (email) => {
    return users.find(user => user.email === email);
  },

  // Buscar usuário por ID
  findById: (id) => {
    return users.find(user => user.id === id);
  },

  // Criar novo usuário
  create: (email, password) => {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = {
      id: users.length + 1,
      email,
      password: hashedPassword,
      blocked: false,
      loginAttempts: 0,
      lastLoginAttempt: null
    };
    users.push(newUser);
    return newUser;
  },

  // Atualizar tentativas de login
  updateLoginAttempts: (email, success = false) => {
    const user = users.find(u => u.email === email);
    if (user) {
      if (success) {
        user.loginAttempts = 0;
        user.lastLoginAttempt = null;
      } else {
        user.loginAttempts += 1;
        user.lastLoginAttempt = new Date();
        if (user.loginAttempts >= 3) {
          user.blocked = true;
        }
      }
    }
    return user;
  },

  // Resetar senha
  resetPassword: (email, newPassword) => {
    const user = users.find(u => u.email === email);
    if (user) {
      user.password = bcrypt.hashSync(newPassword, 10);
      user.blocked = false;
      user.loginAttempts = 0;
      user.lastLoginAttempt = null;
      return true;
    }
    return false;
  },

  // Verificar se email já existe
  emailExists: (email) => {
    return users.some(user => user.email === email);
  },

  // Listar todos os usuários (para debug)
  getAll: () => {
    return users.map(user => ({
      id: user.id,
      email: user.email,
      blocked: user.blocked,
      loginAttempts: user.loginAttempts
    }));
  }
};

module.exports = userService; 

