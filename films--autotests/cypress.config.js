const { defineConfig } = require("cypress");
const dotenv = require('dotenv')

dotenv.config()

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      config.env.EMAIL = process.env.EMAIL
      config.env.TOKEN = process.env.TOKEN
      return config
    },
    baseUrl: "https://finally-films.netlify.app/",
    env: {
      apiBaseUrl: "https://api.themoviedb.org",
      localhostBaseUrl: "http://localhost:8080"
    }
  },
});
