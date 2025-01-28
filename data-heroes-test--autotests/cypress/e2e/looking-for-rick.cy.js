describe('searching for a character (Rick) and validating that the search results contain the expected number of cards', () => {
  const links = {
    mainPage: '',
  }
  const inputData = {
    rick: '',
  }
  const elementsData = {}
  const minimalWaitForCardsToLoad = 500
  const expectedCardsOnPageQuantity = 21

  before(() => {
    cy.fixture('links').then(data => {
      links.mainPage = data.mainPage
    })
    cy.fixture('input-data').then(data => {
      inputData.rick = data.rick
    })
    cy.fixture('elements-data').then(data => {
      Object.assign(elementsData, data)
    })
  })

  it('looking for Rick', () => {
    cy.visit(links.mainPage)
    cy.get(elementsData.input).last().click() // пара элементов, соответствующих селектору: last() для избежания { multiple: true }
    cy.get(elementsData.inputOption).contains(elementsData.searchByName).click()
    cy.get(elementsData.searchInput).type(inputData.rick)
    cy.get(elementsData.button).contains(elementsData.applyButton).click()

    cy.wait(minimalWaitForCardsToLoad)

    cy.get(elementsData.card)
      .should('have.length', expectedCardsOnPageQuantity)
      .each($card => {
        expect($card).to.contain(inputData.rick)
      })
  })
})
