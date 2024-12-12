describe('looking for Rick', () => {
  it('passes', () => {
    cy.visit('https://libaur.github.io/data-heroes-test/')

    cy.get('.v-field__field').click({ multiple: true });

    cy.contains('По имени').click({waitForAnimations: false});

    cy.get('#input-0').type('Rick');

    cy.contains('Применить').click();

    cy.wait(500);

    cy.get('.v-card').each(($card) => {
      cy.wrap($card).contains('Rick');
    })
  })
})