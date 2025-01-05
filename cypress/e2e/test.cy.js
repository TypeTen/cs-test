describe('Hello World Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8023');
    });

    it('should display the correct title', () => {
        cy.title().should('include', 'Conor Brettle');
    });

    it('should display the Select All button', () => {
        cy.get('#select-all').should('exist');
    });

    it('should display the grid header items', () => {
        cy.contains('Name');
        cy.contains('Device');
        cy.contains('Path');
        cy.contains('Status');
    });

    it('should click the Select All checkbox and select every checkbox', () => {
        cy.get('#select-all').click();
        cy.get('.checkbox').not(':disabled').should('be.checked');
    });

    it('should click the Select All checkbox and unselect every selected checkbox', () => {
        cy.get('#select-all').click();
        cy.get('#select-all').click();
        cy.get('.checkbox').not('#select-all').should('not.be.checked');
    });

    it('should check selecting options reads out properly on the Select All button', () => {
        cy.get('#select-all').click();
        cy.contains('Selected 2');
        cy.get('#uxtheme-dll + label').click();
        cy.contains('Selected 1');
        cy.get('#netsh-exe + label').click();
        cy.contains('Select All');
    });

    it('should check that aries.sys is disabled, and therefore not interactive', () => {
        cy.get('#aries-sys').should('be.disabled');
    });
});