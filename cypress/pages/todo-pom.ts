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

    addNewTodo(firstTodo: string) {
        this.newTodoInput().type(firstTodo);
        this.addTodoButton().click();
        this.newAddedTodo().should('be.visible');
        this.newAddedTodo().should('contain', firstTodo);
    }

    addMoreTodos(firstTodo: string, secondTodo:string) {
        this.addNewTodo(firstTodo);
        this.newTodoInput().type(secondTodo);
        this.addTodoButton().click();

    }
}

export default new TodoPage();
