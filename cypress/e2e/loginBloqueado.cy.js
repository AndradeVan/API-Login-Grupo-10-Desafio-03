describe('Bloqueio de Login', () => {

  beforeEach(() => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/auth/unblock',
      body: {
        "email": 'teste@teste.com'
      }
    })
  })
  it('Deve apresentar uma mensagem de erro ao tentar fazer login três vezes com senha inválida', () => {

    //Arrange
    cy.visit('http://localhost:8080')

    //Act 
    cy.get('label[for="email"]').click().type('teste@teste.com')
    cy.get('label[for="password"]').click().type('senaInvalida')
    cy.get('.btn').click()
    cy.get('.btn').click()
    cy.get('.btn').click()
     
    //Assert
    cy.get('.toast').should('contains.text','Usuário bloqueado devido a múltiplas tentativas de login inválidas')
  })
})