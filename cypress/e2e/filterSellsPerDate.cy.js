describe('Filtrar Ventas por Fecha', () => {
    it('debería filtrar las ventas por la fecha 31/10/2023', () => {
      // Visitar la página donde está la tabla de ventas
      cy.visit('http://localhost:3000/sells-history');
      
      // Esperar a que la página se cargue completamente
      cy.wait(1000); // Puedes ajustar este tiempo según sea necesario
  
      // Establecer la fecha en el campo de filtro
      cy.get('.date-input').type('2023-10-31');
  
      // Esperar a que se actualicen las ventas filtradas
      cy.wait(1000); // Puedes ajustar este tiempo según sea necesario
  
      // Verificar que todas las ventas en la tabla tengan la fecha 31/10/2023
      cy.get('.text-center').contains('31/10/2023').should('exist');
  
      // Verificar que no haya ventas con fechas diferentes a 31/10/2023
      cy.get('.text-center').contains('30/10/2023').should('not.exist');
      cy.get('.text-center').contains('01/11/2023').should('not.exist');
    });
  });
  