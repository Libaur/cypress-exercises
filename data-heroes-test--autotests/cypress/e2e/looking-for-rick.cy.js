describe('searching for a character (Rick) and validating that the search results contain the expected number of cards', () => {
  const links = {
    mainPage: '',
  }
  const inputData = {
    rick: '',
    morty: '',
  }
  const selectors = {
    input: '',
    inputOption: '',
    searchInput: '',
    button: '',
    card: '',
  }
  const elementsText = {
    searchByName: '',
    applyButton: '',
  }
  const minimalWaitForCardsToLoad = 500
  const expectedCardsOnPageQuantity = 21

  before(() => {
    cy.fixture('links').then(data => {
      links.mainPage = data.mainPage
    })
    cy.fixture('data-text').then(data => {
      inputData.rick = data.rick
    })
    cy.fixture('elements-text').then(data => {
      elementsText.searchByName = data.searchByName
      elementsText.applyButton = data.applyButton
      selectors.input = data.input
      selectors.inputOption = data.inputOption
      selectors.searchInput = data.searchInput
      selectors.button = data.button
      selectors.card = data.card
    })
  })

  it('looking for Rick', () => {
    cy.visit(links.mainPage)
    cy.get(selectors.input).last().click() // пара элементов, соответствующих селектору: last() для избежания { multiple: true }
    cy.get(selectors.inputOption).contains(elementsText.searchByName).click()
    cy.get(selectors.searchInput).type(inputData.rick)
    cy.get(selectors.button).contains(elementsText.applyButton).click()

    cy.wait(minimalWaitForCardsToLoad)

    cy.get(selectors.card)
      .should('have.length', expectedCardsOnPageQuantity)
      .each($card => {
        expect($card).to.contain(inputData.rick)
      })
  })
})
