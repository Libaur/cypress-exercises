describe("make sure it's the first page and the number of cards is correct", () => {
	let getCards
	const ok = 200
	const expectedTotalCards = 826
	const expectedTotalPages = 42
	const expectedCardsOnPageQuantity = 20

	before(() => {
		cy.fixture('links').then(data => {
			getCards = data.getCards
		})
	})

	it('get cards', () => {
		cy.request(getCards).then(response => {
			const info = response.body.info
			expect(response.status).to.eq(ok)
			expect(info.count).to.eq(expectedTotalCards)
			expect(info.pages).to.eq(expectedTotalPages)
			expect(info.prev).to.eq(null)
			expect(response.body.results).to.have.length(
				expectedCardsOnPageQuantity,
			)
		})
	})
})
