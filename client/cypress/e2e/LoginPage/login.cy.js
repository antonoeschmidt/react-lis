describe('Login Page', () => {
    it('should fail a login',{
        env: {
            username: "admin",
            password: "wrongpassword"
        },
    }, () => {
        cy.visit('/')
        cy.get('[data-cy="username"]').type(Cypress.env('username'))
        cy.get('[data-cy="password"]').type(Cypress.env('password'))
        cy.intercept({ method: "POST", url: "api/login" }).as("login");
        cy.get('[data-cy="submit"]').click()
        cy.wait(["@login"]).its('response.statusCode').should('eq', 400)
    })

    it('should succeed a login',{
        env: {
            username: "admin",
            password: "admin"
        },
    }, () => {
        cy.visit('/')
        cy.get('[data-cy="username"]').type(Cypress.env('username'))
        cy.get('[data-cy="password"]').type(Cypress.env('password'))
        cy.intercept({ method: "POST", url: "api/login" }).as("login");
        cy.get('[data-cy="submit"]').click()
        cy.wait(["@login"]).its('response.statusCode').should('eq', 200)
    })
})