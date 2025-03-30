import { login } from "./login";
import { apiRequest } from "../../../cypress/support/api-request";

Cypress.Commands.add('login', login)
Cypress.Commands.add('apiRequest', apiRequest)

const email = Cypress.env('EMAIL')
const token = Cypress.env('TOKEN')

beforeEach(() => {
    cy.session('performLoginSequence', () => {
        cy.login(email, token)
    }, { cacheAcrossSpecs: true })
})
