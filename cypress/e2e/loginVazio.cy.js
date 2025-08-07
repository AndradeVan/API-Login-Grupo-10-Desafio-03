describe('Login', () => {
    it.only('Login dados válidos deve permitir entrada no sistema', () => {
    
    //Arrange
    cy.visit('http://localhost:8080')
    
    //Act
    cy.get(':nth-child(1) > label').click()
    cy.get(':nth-child(2) > label').click()
    cy.get('.btn').click()

    cy.wait(2000)
     
    //Assert
    cy.contains('h4', 'Sistema de Autenticação').should('be.visible')
  })
})