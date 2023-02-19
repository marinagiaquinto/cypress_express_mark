
///<reference types= "cypress" />


describe('tarefas', () => {

    let testData;
    // let -> cria uma variável
    // o ; depois do testData é pra mostrar que a variável vai inicializar vazia
    //como a variável está fora do before, todos os testes tem acesso a ela

    before(() => {
        cy.fixture('tasks').then(t => {
            testData = t
        })
    })

    //before e after -> ganchos executados antes ou depois dos testes -> reaproveitar comportamento
    //Cuidado com os ganchos! Eles podem prejudicar a independência dos testes !!!
    // Porém, pros casos da massa de teste o gancho é perfeito
    // before executa apenas uma vez o que tiver dentro dela dentro do caso de teste e ele zera 
    // a sessão por cada caso de teste
    // tasks -> nome da fixture que estou chamando
    // t -> argumento que vai receber o valor do arquivo

    //hardcode vs. fixtures
    //hardcode é o nome que se dá para a prática de deixar a massa de dados fixa junto com o código fonte,
    // dificultando a manutenção dos seus valores
    //fixtures é uma camada utilizada no cypress para armazenar a msssa de dados fora do código
    // ela precisa ser escrita em formato json;


    context('cadastro', () => {

        it('Deve cadastrar uma nova tarefa', () => {

            const task1 = 'Ler um livro de Node.js'

            cy.removeTaskByName(task1)
            //requisição para limpar o ambiente para o teste, impedindo que de 
            //erro por tentar criar uma tarefa já existente

            cy.createTask(task1)


            cy.contains('main div p', task1)
                .should('be.visible')

        })


        it('Não deve permitir tarefa duplicada', () => {

            const task2 = testData.dup


            //limpando o ambiente pro teste - Boa prática: DEIXAR OS TESTES INDEPENDENTES
            cy.removeTaskByName(task2.name)

            //Dado que tenho uma tarefa duplicada
            cy.postTask(task2)

            //Quando faço o cadastro dessa tarefa
            cy.createTask(task2.name)
            //task.name -> name é a propriedade da constante.


            //Então vejo a mensagem de duplicidade
            cy.get('.swal2-html-container')
                .should('be.visible')
                .should('have.text', 'Task already exists!')

        })


        it('Campo obrigatório', () => {

            cy.createTask()

            cy.get('@inputTask')
                .invoke('prop', 'validationMessage')
                // a mensagem de erro não é em HTML, é do navegador, usando o invoke 
                //conseguimos pegar uma propriedade desse elemento -> sua mensagem
                .should((text) => {
                    expect('This is a required field').to.eq(text)
        
           
                })
        })

    })


    context('atualização', () => {

        it.only('Deve concluir uma tarefa', () => {

            const task = {
                name: 'Fazer yoga',
                is_done: false
            }

            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('/')
            // "/" é a rota principal da url base


            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemToggle]')
                .click()
            //parent pega o elemento pai (que reune os 2 botões e a tarefa)
            //class* pega não o elemento exato mas todos os que possuem essa parte de texto (a que não muda)

            cy.wait(500)
            //wait é pra aguardar a alteração do css porque a validação do cypress está
            //ocorrendo antes da alteração ser feita

            cy.contains('p', task.name)
                .should('have.css', 'text-decoration-line', 'line-through')

        })
    })

    context('exclusão', () => {

        it('Deve excluir uma tarefa', () => {

            const task = {
                name: 'Ler um livro de Node.js',
                is_done: false
            }

            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemDelete]')
                .click()
            //parent pega o elemento pai (que reune os 2 botões e a tarefa)
            //class* pega não o elemento exato mas todos os que possuem essa parte de texto (a que não muda)

            cy.contains('p', task.name)
                .should('not.exist')

        })

    })
    
})


