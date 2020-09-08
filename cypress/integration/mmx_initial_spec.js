describe("Home page", () => {
	it("successfully loads", () => {
		cy.visit("http://localhost:3000");
		cy.title().should("eq", "vMMX");
	});

	it("Contains correct set of vibraphone plates", () => {
		cy.get("#vibraphone")
			.contains("B4")
			.parent()
			.should("have.id", "vibraphoneBar");
		cy.get("#vibraphone")
			.contains("C5")
			.parent()
			.should("have.id", "vibraphoneBar");
		cy.get("#vibraphone")
			.contains("D5")
			.parent()
			.should("have.id", "vibraphoneBar");
		cy.get("#vibraphone")
			.contains("E5")
			.parent()
			.should("have.id", "vibraphoneBar");
		cy.get("#vibraphone")
			.contains("F#5")
			.parent()
			.should("have.id", "vibraphoneBar");
		cy.get("#vibraphone")
			.contains("G5")
			.parent()
			.should("have.id", "vibraphoneBar");
		cy.get("#vibraphone")
			.contains("A5")
			.parent()
			.should("have.id", "vibraphoneBar");
		cy.get("#vibraphone")
			.contains("B5")
			.parent()
			.should("have.id", "vibraphoneBar");
		cy.get("#vibraphone")
			.contains("C6")
			.parent()
			.should("have.id", "vibraphoneBar");
		cy.get("#vibraphone")
			.contains("D6")
			.parent()
			.should("have.id", "vibraphoneBar");
		cy.get("#vibraphone")
			.contains("E6")
			.parent()
			.should("have.id", "vibraphoneBar");

		cy.get("#vibraphone")
			.children()
			.children("#vibraphoneBar")
			.should("have.length", 11);
	});
});
