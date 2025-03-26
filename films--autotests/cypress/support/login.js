const elementsData = {}

before(() => {
    cy.fixture('elements-data').then(data => {
        Object.assign(elementsData, data)
    })
})

export function login(email, token) {
    cy.visit('/')
    cy.contains(elementsData.enterButtonText).click()
    cy.get(elementsData.emailInput).type(email)
    cy.contains(elementsData.requestButtonText).click()
    cy.get(elementsData.tokenInput).type(token)
    cy.contains(elementsData.approveButtonText).click()
}

