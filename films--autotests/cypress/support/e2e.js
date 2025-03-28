import { login } from "./login";
import { apiRequest } from "./api-request";

Cypress.Commands.add('login', login)
Cypress.Commands.add('apiRequest', apiRequest)

const inputData = {}

beforeEach(() => {
    cy.fixture('input-data').then(data => {
        Object.assign(inputData, data)
    })
    cy.session('performLoginSequence', () => {
        cy.login(inputData.email, inputData.token)
    }, { cacheAcrossSpecs: true })
})
