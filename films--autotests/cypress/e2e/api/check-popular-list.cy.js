import { ENDPOINTS } from '../../support/endpoints'

describe('check popular list', () => {
    const OK = 200
    const EXPECTED_PAGE = 1
    const EXPECTED_LENGTH = 20
    const MINIMAL_EXPECTED_POPULARITY = 100

    it('check popular data', () => {
        cy.request(
            Cypress.env('localhostBaseUrl') + ENDPOINTS.getPopularMovies
        ).then(response => {
            expect(response.status).to.eq(OK)
            expect(response.body.page).to.eq(EXPECTED_PAGE)
            expect(response.body.results.length).to.eq(EXPECTED_LENGTH)
            expect(response.body.results.every(movie => movie.popularity > MINIMAL_EXPECTED_POPULARITY)).to.be.true
        })
    })
})