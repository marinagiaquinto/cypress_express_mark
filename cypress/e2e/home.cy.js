///<reference types= "cypress" />


describe('home', () => {
  it('web app deve estar online', () => {
    cy.visit('/')
    // "/" traz a url base mapeada no cypress.config.js

    cy.title().should('eq', 'Gerencie suas tarefas com Mark L')
  })
}) 