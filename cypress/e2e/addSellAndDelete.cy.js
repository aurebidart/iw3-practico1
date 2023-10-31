describe('Agregar y Eliminar Venta', () => {
    it('debería agregar y luego eliminar una venta correctamente', () => {
      // Visitar la página donde está la tabla de ventas
      cy.visit('http://localhost:3000/sells-history');
  
      // Esperar a que la página se cargue completamente
      cy.wait(1000);
  
      // Agregar una nueva venta
      cy.contains('New Sell').click();
      cy.wait(1000);
      cy.get('.v-select').click();
      cy.contains('.v-list-item', 'Manzanas', { timeout: 5000 }).scrollIntoView().should('be.visible').click();
      cy.contains('.v-text-field', 'Cantidad').type('1');
      cy.get('.v-autocomplete').click();
      cy.contains('.v-list-item', 'Ana', { timeout: 5000 }).scrollIntoView().should('be.visible').click();
      cy.contains('Aceptar').click();
      cy.wait(1000);
  
      // Verificar que la venta ha sido agregada
      cy.get('.text-center').contains('Manzanas').should('exist');
  
      // Obtener la última fila de la tabla y hacer clic en el último v-btn dentro de esa fila
      cy.get('.text-center').last().within(() => {
        cy.get('.v-btn').last().click();
      });
  
      // Confirmar la eliminación
      cy.contains('.v-btn', 'Eliminar').click();
      cy.wait(1000);
    });
  });
  