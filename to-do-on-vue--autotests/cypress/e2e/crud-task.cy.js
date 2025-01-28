import { createTask } from '../support/helpers.js'

describe('CRUD a task', () => {
	const inputData = {}
	const elementsData = {}

	before(() => {
		cy.fixture('input-data').then(data => {
			Object.assign(inputData, data)
		})
		cy.fixture('elements-data').then(data => {
			Object.assign(elementsData, data)
		})
	})

	it('create, update and delete a task', () => {
		cy.visit('/')

		createTask(inputData.taskTitle, inputData.taskDescription, elementsData)

		cy.get(elementsData.taskItem).should('have.length', 1)
		cy.get(elementsData.itemTitle).should(
			'contain.text',
			inputData.taskTitle,
		)
		cy.get(elementsData.itemDescription).should(
			'contain.text',
			inputData.taskDescription,
		)

		cy.get(elementsData.taskItem)
			.trigger('mouseover')
			.get(elementsData.startEditButton)
			.should('be.visible')
		cy.get(elementsData.startEditButton).click()
		cy.get(elementsData.taskItem).should('not.exist')
		cy.get(elementsData.endEditButton).click()
		cy.get(elementsData.taskItem).should('exist')

		cy.contains(elementsData.deleteButton).click()
		cy.get(elementsData.taskItem).should('not.exist')
	})
})
