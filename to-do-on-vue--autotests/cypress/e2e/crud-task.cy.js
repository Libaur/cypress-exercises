describe("CRUD a task", () => {
	let deleteButton, taskTitle, taskDescription;

	before(() => {
		const dataText = cy.fixture("data-text");
		const elementsText = cy.fixture("elements-text");

		Promise.all([dataText, elementsText]).then(
			([dataText, elementsText]) => {
				deleteButton = elementsText.deleteButton;
				taskTitle = dataText.taskTitle;
				taskDescription = dataText.taskDescription;
			},
		);
	});

	it("create, update and delete a task", () => {
		cy.visit("/");

		cy.get("#input-2").type(taskTitle);
		cy.get("#input-4").type(taskDescription);
		cy.get(".add-btn").click();
		cy.get(".v-list-item-title").should("contain.text", taskTitle);
		cy.get(".v-list-item-subtitle").should(
			"contain.text",
			taskDescription,
		);

		cy.get(".v-list-item")
			.trigger("mouseover")
			.get(".edit-btn")
			.should("be.visible");
		cy.get(".edit-btn").click();
		cy.get(".v-list-item").should("not.exist");
		cy.get(".mdi-clipboard-edit-outline").click();
		cy.get(".v-list-item").should("exist");

		cy.contains(deleteButton).click();
		cy.get(".v-list-item").should("not.exist");
	});
});
