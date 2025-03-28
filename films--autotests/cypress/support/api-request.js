export function apiRequest(options) {
    const apiBaseUrl = Cypress.env('apiBaseUrl')
    return cy.request({
        ...options,
        url: `${apiBaseUrl}${options.url}`
    })
}