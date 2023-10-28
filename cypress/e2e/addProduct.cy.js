describe('add product', () => {
    it ('should add a product', () => {
        cy.visit('http://localhost:3000')
        cy.contains('button', 'Agregar producto').click()
        cy.get('[data-cy="product-name"]').type('Producto 1')
        cy.get('[data-cy="product-price"]').type('100')
        cy.get('[data-cy="product-stock"]').type('20')
        cy.get('[data-cy="product-description"]').type('Descripción del producto')
        cy.get('[data-cy="product-cost"]').type('50')
        cy.contains('Guardar').click()
        cy.contains('Producto 1').should('have.value', 'Producto 1')
        cy.contains('50').should('have.value', '100')
    })
})