import { createTask } from '../support/helpers.js'

describe('advance a task through the life cycle', () => {
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

	const checkTaskExist = () => cy.get(elementsData.taskItem).should('exist')
	const checkTaskNotExist = () =>
		cy.get(elementsData.taskItem).should('not.exist')
	const clickButton = buttonText => cy.contains(buttonText).click()

	it('create, execute, return, archive and delete a task', () => {
		cy.visit('/')

		createTask(inputData.taskTitle, inputData.taskDescription, elementsData)

		clickButton(elementsData.completed)
		cy.get(elementsData.chapterTitle).should(
			'contain.text',
			elementsData.completed,
		)
		clickButton(elementsData.inWork)
		cy.get(elementsData.chapterTitle).should(
			'contain.text',
			elementsData.inWork,
		)
		clickButton(elementsData.doneButton)
		checkTaskNotExist()
		clickButton(elementsData.completed)
		checkTaskExist()
		clickButton(elementsData.backToWorkButton)
		checkTaskNotExist()
		clickButton(elementsData.inWork)
		checkTaskExist()
		clickButton(elementsData.deleteButton)
		checkTaskNotExist()
		clickButton(elementsData.toArchiveButton)
		checkTaskExist()
		cy.get(elementsData.chapterTitle).should(
			'contain.text',
			elementsData.archive,
		)
		clickButton(elementsData.deleteButton)
		checkTaskNotExist()
		clickButton(elementsData.completed)
		checkTaskNotExist()
		clickButton(elementsData.inWork)
		checkTaskNotExist()
	})
})
