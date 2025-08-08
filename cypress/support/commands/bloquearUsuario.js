Cypress.Commands.add('desbloquearUsuario', email => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3000/api/auth/unblock',
    body: {
      "email": email
    }
  })
})