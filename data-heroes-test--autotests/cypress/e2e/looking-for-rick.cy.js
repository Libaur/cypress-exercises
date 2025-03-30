import { SELECTORS } from "../support/selectors"

describe('searching for a character (Rick) and validating that the search results contain the expected number of cards', () => {
  const RICK = 'Rick'
  const MINIMAL_WAIT_FOR_CARDS_TO_LOAD = 500
  const EXPECTED_CARDS_ON_PAGE_QUANTITY = 21

  it('looking for Rick', () => {
    cy.visit('/')
    cy.get(SELECTORS.input).last().click() // пара элементов, соответствующих селектору: last() для избежания { multiple: true }
    cy.get(SELECTORS.inputOption).contains(SELECTORS.searchByName).click()
    cy.get(SELECTORS.searchInput).type(RICK)
    cy.get(SELECTORS.button).contains(SELECTORS.applyButton).click()

    cy.wait(MINIMAL_WAIT_FOR_CARDS_TO_LOAD)

    cy.get(SELECTORS.card)
      .should('have.length', EXPECTED_CARDS_ON_PAGE_QUANTITY)
      .each($card => {
        expect($card).to.contain(RICK)
      })
  })
})
