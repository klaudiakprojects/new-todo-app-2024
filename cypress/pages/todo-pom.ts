/// <reference types="cypress" />

class TodoPage {
    newTodoInput() {
        return cy.get('#newTodoInput');
    }

    addTodoButton() {
        return cy.get('#addNewTodoButton');
    }

    newAddedTodo() {
        return cy.get('.new-added-todo');
    }

    addNewTodo() {
        this.newTodoInput().type('Learn JavaScript');
        this.addTodoButton().click();
        this.newAddedTodo().should('be.visible');
        this.newAddedTodo().should('contain', 'Learn JavaScript');
    }

    addMoreTodos() {
        this.addNewTodo();
        this.newTodoInput().type('Learn TypeScript');
        this.addTodoButton().click();

    }
}

export default new TodoPage();
