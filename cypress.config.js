const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    env: {
      apiUrl: 'http://localhost:3333'
    },

    viewportWidth:1920,
    viewportheight:1080,

//before -> é encerrado em cada sessão
//beforeEach -> é executado pra todos os casos de teste mas apenas naquela suit que foi chamado
//viewportWidth e viewportheight no cypress.config permitem a definição do tamanho da tela em todo projeto

    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
  },
});


