const { expect } = require('chai')
const request = require('supertest')

describe('POST /lembrar-senha', () => { 
    it('deve retornar 200 se o email for válido', async () => {
        const response = await request('http://localhost:3000/')
        .post('api/auth/forgot-password')
        .set('Content-Type', 'application/json')
        .send({
            email: "admin@teste.com",
            newPassword: "novasenha123"
        })
        expect(response.status).to.equal(200)
        expect(response.body.message).to.equal('Senha alterada com sucesso')
    })
    it('deve retornar 404 se o email for inválido', async () => {
        const response = await request('http://localhost:3000/')
        .post('api/auth/forgot-password')
        .set('Content-Type', 'application/json')
        .send({
            email: "adminInvalido@teste.com",
            newPassword: "novasenha123"
        })
        expect(response.status).to.equal(404)
        expect(response.body.message).to.equal('Usuário não encontrado')
    })
})