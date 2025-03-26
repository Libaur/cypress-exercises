const inputData = {}

beforeEach(() => {
    cy.fixture('input-data').then(data => {
        Object.assign(inputData, data)
    })
    cy.session('performLoginSequence', () => {
        cy.login(inputData.email, inputData.token)
    }, { cacheAcrossSpecs: true })
})
