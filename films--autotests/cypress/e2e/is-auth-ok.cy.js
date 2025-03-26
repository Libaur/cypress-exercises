describe('is auth ok', () => {
    const elementsData = {}

    before(() => {
        cy.fixture('elements-data').then(data => {
            Object.assign(elementsData, data)
        })
    })

    it('is main title exist', () => {
        cy.contains(elementsData.mainTitle).should('exist')
    })
})

