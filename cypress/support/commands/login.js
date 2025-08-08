Cypress.Commands.add('login', (email, password) => {
  cy.get('label[for="email"]').click().type(email)
  cy.get('label[for="password"]').click().type(password)
  cy.get('.btn').click()
})