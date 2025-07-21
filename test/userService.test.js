const userService = require('../data/users.js')
const { strictEqual } = require('node:assert')
const { expect } = require('chai')


describe('userService', () => {
  it('deve encontrar usuário por email', () => {
    const user = userService.findByEmail('admin@teste.com');
    expect(user).to.exist;
    expect(user.email).to.equal('admin@teste.com');
  });

  it('deve bloquear usuário após 3 tentativas de login', () => {
    const email = 'teste@teste.com';
    userService.updateLoginAttempts(email, false);
    userService.updateLoginAttempts(email, false);
    const user = userService.updateLoginAttempts(email, false);
    expect(user.blocked).to.be.true;
    expect(user.loginAttempts).to.equal(3);
  });

  /*it('deve criar novo usuário corretamente', () => {
    const novo = userService.create('novo@teste.com', 'senha123');
    expect(novo).to.include({ email: 'novo@teste.com', blocked: false });
    expect(userService.emailExists('novo@teste.com')).to.be.true;
  });*/
});
