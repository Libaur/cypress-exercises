import { SELECTORS } from './selectors'

export function login(email, token) {
    cy.visit('/')
    cy.contains(SELECTORS.enterButtonText).click()
    cy.get(SELECTORS.emailInput).type(email)
    cy.contains(SELECTORS.requestButtonText).click()
    cy.get(SELECTORS.tokenInput).type(token)
    cy.contains(SELECTORS.approveButtonText).click()
}

