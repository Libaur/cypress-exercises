describe("make sure it's the first page and the number of cards is correct", () => {
	let getCards;

	before(() => {
		const links = cy.fixture("links");

		return links.then((linksData) => {
			getCards = linksData.getCards;
		});
	});

	it("get cards", () => {
		cy.request(getCards).then((response) => {
			const info = response.body.info;
			expect(response.status).to.eq(200);
			expect(info.count).to.eq(826);
			expect(info.pages).to.eq(42);
			expect(info.prev).to.eq(null);
			expect(response.body.results).to.have.length(20);
		});
	});
});
