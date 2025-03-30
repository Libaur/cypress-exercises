import { ENDPOINTS } from '../../support/endpoints'

describe("make sure it's the first page and the number of cards is correct", () => {
	const OK = 200
	const EXPECTED_TOTAL_CARDS = 826
	const EXPECTED_TOTAL_PAGES = 42
	const EXPECTED_CARDS_ON_PAGE_QUANTITY = 20

	it('get cards', () => {
		cy.apiRequest({
			method: 'GET',
			url: ENDPOINTS.getCards
		}).then(response => {
			const info = response.body.info
			expect(response.status).to.eq(OK)
			expect(info.count).to.eq(EXPECTED_TOTAL_CARDS)
			expect(info.pages).to.eq(EXPECTED_TOTAL_PAGES)
			expect(info.prev).to.eq(null)
			expect(response.body.results).to.have.length(
				EXPECTED_CARDS_ON_PAGE_QUANTITY,
			)
		})
	})
})
