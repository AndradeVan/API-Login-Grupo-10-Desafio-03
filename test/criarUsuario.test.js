const loginUsuario = require('../data/users.js')
const { strictEqual } = require('node:assert')
const { expect } = require('chai')


describe('criarUsuario', () => {
 

  it('deve criar novo usuário corretamente', () => {
    const novo = loginUsuario.create('novo@teste.com', 'senha123');
    expect(novo).to.include({ email: 'novo@teste.com', blocked: false });
    expect(loginUsuario.emailExists('novo@teste.com')).to.be.true;
  })
})