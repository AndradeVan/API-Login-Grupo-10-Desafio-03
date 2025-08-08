describe('Bloqueio de Login', () => {


  it('Deve apresentar uma mensagem de erro ao tentar fazer login três vezes com senha inválida', () => {

    //Arrange
    cy.visit('/')

    //Act 
    cy.fixture('login').then((login) => {
      cy.login(login.invalido.email, login.invalido.password)
    })
    cy.get('.btn').click()
    cy.get('.btn').click()
     
    //Assert
    cy.get('.toast').should('contains.text','Usuário ou senha inválidos, tente novamente')
    cy.get('.toast').should('contains.text','Usuário bloqueado devido a múltiplas tentativas de login inválidas')
  })

  afterEach(() => {
    cy.desbloquearUsuario('admin@teste.com')
  })
})