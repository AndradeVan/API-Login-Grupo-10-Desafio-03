describe('Login', () => {
  it('Login inválido deve apresentar mensagem de erro', () => {
    
    //Arrange
    cy.visit('http://localhost:8080')
    
    //Act
    cy.get(':nth-child(1) > label').click().type('admin@teste.com')
     cy.get(':nth-child(2) > label').click().type('senaInvalida')
     cy.get('.btn').click()
     
     //Assert
    cy.get('.toast').should('be.visible')
  })
})