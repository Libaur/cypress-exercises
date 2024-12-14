describe('looking for Rick', () => {
  let rick, mainPage, searchByName, applyButton;

  before(() => {
    const links = cy.fixture('links');
    const dataText = cy.fixture('data-text');
    const elementsText = cy.fixture('elements-text');

    Promise.all([links, dataText, elementsText]).then(([links, dataText, elementsText]) => {
      rick = dataText.rick;
      mainPage = links.mainPage;
      searchByName = elementsText.searchByName;
      applyButton = elementsText.applyButton;
    })
  })

  it('passes', () => {
    cy.visit(mainPage)

    cy.get('.v-field__input').last().click(); // пара элементов, соответствующих селектору: last() для избежания { multiple: true }

    cy.get('.v-list-item-title').contains(searchByName).click();

    cy.get('#input-0').type(rick);

    cy.get('.v-btn').contains(applyButton).click();

    cy.wait(500); // загрузка карточек

    cy.get('.v-card').should('have.length', 21).each(($card) => {
      expect($card).to.contain(rick);
    })
  })
})