describe("Exam Dashboard E2E", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.get("[data-testid=get-started]").click();
    });

    it("displays the exam info card", () => {
        cy.get("h6").contains("Midterm Assessment").should("exist");
    });

    it("shows student progress", () => {
        cy.get("[data-testid=student-list] tr").should(
            "have.length.within",
            1,
            7
        );
    });

    it("shows exam statistics", () => {
        cy.get(".apexcharts-canvas").should("have.length", 3);
    });
});
