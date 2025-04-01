import { ENDPOINTS } from '../../support/endpoints'

describe('check favorites list', () => {
    const OK = 200
    const EXPECTED_PAGE = 1
    const EXPECTED_LENGTH = 5

    it('check list data', () => {
        cy.request(
            Cypress.env('localhostBaseUrl') + ENDPOINTS.getFavoriteMovies
        ).then(response => {
            expect(response.status).to.eq(OK)
            expect(response.body.page).to.eq(EXPECTED_PAGE)
            expect(response.body.results.length).to.eq(EXPECTED_LENGTH)
            expect(response.body.results.some(movie => movie.title === 'Dragonkeeper')).to.be.true
        })
    })
})

