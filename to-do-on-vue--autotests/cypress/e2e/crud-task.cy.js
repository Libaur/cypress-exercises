import { SELECTORS } from '../support/selectors.js'
import { INPUT_DATA } from '../support/input-data.js'
import { createTask } from '../support/helpers.js'

describe('CRUD a task', () => {

	it('create, update and delete a task', () => {
		cy.visit('/')

		createTask(INPUT_DATA.taskTitle, INPUT_DATA.taskDescription, SELECTORS)

		cy.get(SELECTORS.taskItem).should('have.length', 1)
		cy.get(SELECTORS.itemTitle).should(
			'contain.text',
			INPUT_DATA.taskTitle,
		)
		cy.get(SELECTORS.itemDescription).should(
			'contain.text',
			INPUT_DATA.taskDescription,
		)

		cy.get(SELECTORS.taskItem)
			.trigger('mouseover')
			.get(SELECTORS.startEditButton)
			.should('be.visible')
		cy.get(SELECTORS.startEditButton).click()
		cy.get(SELECTORS.taskItem).should('not.exist')
		cy.get(SELECTORS.endEditButton).click()
		cy.get(SELECTORS.taskItem).should('exist')

		cy.contains(SELECTORS.deleteButton).click()
		cy.get(SELECTORS.taskItem).should('not.exist')
	})
})
