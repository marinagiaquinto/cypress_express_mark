///<reference types= "cypress" />



// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('createTask', (argumento = '') => {
// o () é onde coloco o argumento, o valor que deve ser utilizado
// '' para colocar um valor a riori nele que me possibilite reutilizar esse código
// quando o campo não está preenchido

    cy.visit('/')

    cy.get('input[placeholder="Add a new Task"]').as('inputTask')
    //apelidando localizador que está sendo reutilizado

    if (argumento !== '') {
       cy.get('@inputTask').type(argumento)
    }

    cy.contains('button', 'Create').click()

})


Cypress.Commands.add('removeTaskByName', (taskname_argumento) => {

    cy.request({
        url: Cypress.env('apiUrl') + '/helper/tasks',
        method: 'DELETE',
        body: {name: taskname_argumento}
    }).then(response => {
        expect(response.status).to.eq(204)
    })

})

Cypress.Commands.add('postTask', (task) => {
    
    cy.request({
        url: Cypress.env('apiUrl') + '/tasks',
        method: 'POST',
        body:task
    }).then(response => {
        expect(response.status).to.eq(201)
    })

})