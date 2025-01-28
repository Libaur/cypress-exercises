export const createTask = (title, description, elementsData) => {
    cy.get(elementsData.titleInput).type(title)
    cy.get(elementsData.descriptionInput).type(description)
    cy.get(elementsData.addButton).click()
}
