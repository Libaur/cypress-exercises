import { SELECTORS } from '../support/selectors.js'
import { INPUT_DATA } from '../support/input-data.js'
import { createTask } from '../support/helpers.js'

describe('advance a task through the life cycle', () => {
	const checkTaskExist = () => cy.get(SELECTORS.taskItem).should('exist')
	const checkTaskNotExist = () =>
		cy.get(SELECTORS.taskItem).should('not.exist')
	const clickButton = buttonText => cy.contains(buttonText).click()

	it('create, execute, return, archive and delete a task', () => {
		cy.visit('/')

		createTask(INPUT_DATA.taskTitle, INPUT_DATA.taskDescription, SELECTORS)

		clickButton(SELECTORS.completed)
		cy.get(SELECTORS.chapterTitle).should(
			'contain.text',
			SELECTORS.completed,
		)
		clickButton(SELECTORS.inWork)
		cy.get(SELECTORS.chapterTitle).should(
			'contain.text',
			SELECTORS.inWork,
		)
		clickButton(SELECTORS.doneButton)
		checkTaskNotExist()
		clickButton(SELECTORS.completed)
		checkTaskExist()
		clickButton(SELECTORS.backToWorkButton)
		checkTaskNotExist()
		clickButton(SELECTORS.inWork)
		checkTaskExist()
		clickButton(SELECTORS.deleteButton)
		checkTaskNotExist()
		clickButton(SELECTORS.toArchiveButton)
		checkTaskExist()
		cy.get(SELECTORS.chapterTitle).should(
			'contain.text',
			SELECTORS.archive,
		)
		clickButton(SELECTORS.deleteButton)
		checkTaskNotExist()
		clickButton(SELECTORS.completed)
		checkTaskNotExist()
		clickButton(SELECTORS.inWork)
		checkTaskNotExist()
	})
})
