describe('Login', () => {
  it('Login dados válidos deve permitir entrada no sistema', () => {
    
    //Arrange
    cy.visit('http://localhost:8080')
    
    //Act
    cy.get(':nth-child(1) > label').click().type('usuario@teste.com')
     cy.get(':nth-child(2) > label').click().type('123456')
     cy.get('.btn').click()
     
     //Assert
     cy.contains('h2', 'Bem vindo ao Desafio 04').should('be.visible')
  })
})