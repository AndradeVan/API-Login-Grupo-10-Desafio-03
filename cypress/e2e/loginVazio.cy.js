describe('Login', () => {
  it('Login dados válidos deve permitir entrada no sistema', () => {
    
    //Arrange
    cy.visit('http://localhost:8080')
    
    //Act
    cy.get(':nth-child(1) > label').click().type('')
     cy.get(':nth-child(2) > label').click().type('')
     cy.get('.btn').click()
     
     //Assert
     cy.contains('h4', 'Sistema de Autenticação').should('be.visible')
  })
})