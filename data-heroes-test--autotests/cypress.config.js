const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://libaur.github.io/data-heroes-test/", 
    env: {
      apiBaseUrl: "https://rickandmortyapi.com"
    }
  },
});
