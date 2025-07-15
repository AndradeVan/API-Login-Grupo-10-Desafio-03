const jwt = require('jsonwebtoken');

const JWT_SECRET = 'sua_chave_secreta_muito_segura_para_estudos';

const jwtUtils = {
  // Gerar token JWT
  generateToken: (userId, email) => {
    return jwt.sign(
      { 
        userId, 
        email,
        iat: Math.floor(Date.now() / 1000)
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
  },

  // Verificar token JWT
  verifyToken: (token) => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return null;
    }
  },

  // Extrair token do header Authorization
  extractToken: (authHeader) => {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    return authHeader.substring(7);
  }
};

module.exports = jwtUtils; 