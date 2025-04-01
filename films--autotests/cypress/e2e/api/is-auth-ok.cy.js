import { ENDPOINTS } from '../../support/endpoints'

describe('is auth ok', () => {
    const OK = 200
    const EXPECTED_USER_ID = 21034190
    const EXPECTED_USER_NAME = 'corpseObscur'
    const token = Cypress.env('TOKEN')
    let mockAccountData

    before(() => {
        cy.fixture('acc-data').then(data => {
            mockAccountData = data
        })

        cy.intercept('GET', `${Cypress.env.apiBaseUrl}${ENDPOINTS.getAccountData}`, {
            statusCode: 200,
            body: mockAccountData
        })
    })

    it('check account data', () => {
        cy.apiRequest({
            method: 'GET',
            url: ENDPOINTS.getAccountData,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            expect(response.status).to.eq(OK)
            expect(response.body.id).to.eq(EXPECTED_USER_ID)
            expect(response.body.username).to.eq(EXPECTED_USER_NAME)
        })
    })
})

