


describe('Easy testing', () => {

    it('hello world test', () => {
      expect(true).to.equal(true);
    });


    beforeEach(() => {

        cy.fixture('courses.json').as("coursesJSON");

        cy.server();

        cy.route('/api/courses', "@coursesJSON").as("courses");

        cy.visit('/');

    });





    it('should send request to jsonplaceholder and create new fixture file', () => {
      cy.request('https://jsonplaceholder.typicode.com/todos').then(
        response => {
          cy.writeFile("cypress/fixtures/todos.json", response.body);
        }
      )
    });

    it('should display a list of courses', () => {

        cy.contains("All Courses");

        cy.wait('@courses');

        // cy.wait(120313); also work with milliseconds

        cy.get("mat-card").should("have.length", 9);

    });

    it('should display the advanced courses', () => {

        cy.get('.mat-tab-label').should("have.length", 2);

        cy.get('.mat-tab-label').last().click();

        cy.get('.mat-tab-body-active .mat-card-title').its('length').should('be.gt', 1);

        cy.get('.mat-tab-body-active .mat-card-title').first()
            .should('contain', "Angular Security Course");

    });

    it('should display about page', () => {
      cy.get('.navigation-item').should('have.length', 3);

      cy.get('.navigation-item').last().click();

      cy.get('h1').should('contain', 'Welcome!');
    });

    it('should display course page', () => {

      cy.wait('@courses');

      cy.get('.mat-raised-button.mat-primary.mat-button').first().click();

      cy.get('.mat-table');

      cy.get('h2').should('contain', 'Angular Testing Course')

    })


});






















