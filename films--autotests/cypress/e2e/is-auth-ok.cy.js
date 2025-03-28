import { ENDPOINTS } from '../support/endpoints'

describe('is auth ok', () => {
    const ok = 200
    const expectedUserId = 21034190
    const expectedUserName = 'corpseObscur'
    let mockAccountData
    let token

    before(() => {
        cy.fixture('input-data').then(data => {
            token = data.token
        })
    })

    before(() => {
        cy.fixture('mock-acc-data').then(data => {
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
            expect(response.status).to.eq(ok)
            expect(response.body.id).to.eq(expectedUserId)
            expect(response.body.username).to.eq(expectedUserName)
        })
    })
})

