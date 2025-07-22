const request = require('supertest')
const { expect } = require('chai')

describe('POST /login', () => { 

  it('deve retornar 200 se o login for feito com sucesso', async () => {
    const response = await request('http://localhost:3000/')
    .post('api/auth/login')
    .set('Content-Type', 'application/json')
    .send({
      email: "admin@teste.com",
      password: "123456"
    })

    expect(response.status).to.equal(200)
    expect(response.body.token).to.be.a('string')
    
  })

  it('deve retornar 401 se o usuário estiver com email válido e senha inválida', async () => {
    const response = await request('http://localhost:3000/')
    .post('api/auth/login')
    .set('Content-Type', 'application/json')
    .send({
      email: "admin@teste.com",
      password: "senhaInvalida"
    })

    expect(response.status).to.equal(401)
    expect(response.body.message).to.equal('Usuário ou senha inválidos, tente novamente')

  })

  it('deve retornar 401 se o usuário estiver com email inválido e senha válida', async () => { 
    const response = await request('http://localhost:3000/')
    .post('api/auth/login')
    .set('Content-Type', 'application/json')
    .send({
      email: "adminInvalido@teste.com",
      password: "123456"
    })

    expect(response.status).to.equal(401)
    expect(response.body.message).to.equal('Usuário ou senha inválidos, tente novamente')

  })

  it('deve retornar 400 se o usuário não preencher email e senha', async () => {
    const response = await request('http://localhost:3000/')
    .post('api/auth/login')
    .set('Content-Type', 'application/json')
    .send({
      email: "",
      password: ""
    })

    expect(response.status).to.equal(400)
    expect(response.body.message).to.equal('Email e senha são obrigatórios')

  })
})