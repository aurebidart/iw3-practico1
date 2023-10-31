describe('Formulario de Nueva Venta', () => {
  it('debería realizar una nueva venta correctamente', () => {
    cy.visit('http://localhost:3000/sells-history');
    cy.wait(1000); 
    cy.contains('New Sell').click();
    cy.wait(1000);
    cy.get('.v-select').click();
    cy.contains('.v-list-item', 'Manzanas', { timeout: 5000 }).scrollIntoView().should('be.visible').click();
    cy.contains('.v-text-field', 'Cantidad').type('1'); 
    cy.get('.v-autocomplete').click(); 
    cy.contains('.v-list-item', 'Ana', { timeout: 5000 }).scrollIntoView().should('be.visible').click();
    cy.contains('Aceptar').click();
  });
});
