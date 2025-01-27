describe('CRUD a task', () => {
	const inputData = {
		taskTitle: '',
		taskDescription: '',
	}
	const selectors = {
		deleteButton: '',
		titleInput: '',
		descriptionInput: '',
		addButton: '',
		taskItem: '',
		itemTitle: '',
		itemDescription: '',
		startEditButton: '',
		endEditButton: '',
	}

	before(() => {
		cy.fixture('data-text').then(data => {
			inputData.taskTitle = data.taskTitle
			inputData.taskDescription = data.taskDescription
		})
		cy.fixture('elements-text').then(data => {
			selectors.deleteButton = data.deleteButton
			selectors.titleInput = data.titleInput
			selectors.descriptionInput = data.descriptionInput
			selectors.addButton = data.addButton
			selectors.taskItem = data.taskItem
			selectors.itemTitle = data.itemTitle
			selectors.itemDescription = data.itemDescription
			selectors.startEditButton = data.startEditButton
			selectors.endEditButton = data.endEditButton
		})
	})

	it('create, update and delete a task', () => {
		cy.visit('/')

		cy.get(selectors.titleInput).type(inputData.taskTitle)
		cy.get(selectors.descriptionInput).type(inputData.taskDescription)
		cy.get(selectors.addButton).click()
		cy.get(selectors.taskItem).should('have.length', 1)
		cy.get(selectors.itemTitle).should('contain.text', inputData.taskTitle)
		cy.get(selectors.itemDescription).should(
			'contain.text',
			inputData.taskDescription,
		)

		cy.get(selectors.taskItem)
			.trigger('mouseover')
			.get(selectors.startEditButton)
			.should('be.visible')
		cy.get(selectors.startEditButton).click()
		cy.get(selectors.taskItem).should('not.exist')
		cy.get(selectors.endEditButton).click()
		cy.get(selectors.taskItem).should('exist')

		cy.contains(selectors.deleteButton).click()
		cy.get(selectors.taskItem).should('not.exist')
	})
})
