/// <reference types="cypress" />

class TodoPage {
    newTodoInput() {
        return cy.get('#newTodoInput');
    };

    addTodoButton() {
        return cy.get('#addNewTodoButton');
    };

    newAddedTodo() {
        return cy.get('.new-added-todo');
    };

    deleteAllTodosButton() {
        return cy.get('#deleteAllButton');
    };

    editTodoInput() {
        return cy.get('.edit-todo-input');
    };

    deleteAllTodos() {
        this.deleteAllTodosButton().click();
    };



    addNewTodo(firstTodo: string) {
        this.newTodoInput().type(firstTodo);
        this.addTodoButton().click();
        this.newAddedTodo().should('be.visible');
        this.newAddedTodo().should('contain', firstTodo);
    };

    addMoreTodos(firstTodo: string, secondTodo: string) {
        this.addNewTodo(firstTodo);
        this.newTodoInput().type(secondTodo);
        this.addTodoButton().click();
        this.newAddedTodo().eq(0).should('contain', firstTodo);
        this.newAddedTodo().eq(1).should('contain', secondTodo);
    };

    editTodo(firstTodo: string, secondTodo: string) {
        this.addNewTodo(firstTodo);
        this.newAddedTodo().click();
        this.editTodoInput().clear().type(secondTodo);
        // this.editTodoInput().type('{Enter}');
        // cy.wait(4000);
        // this.newAddedTodo().eq(0).should('be.visible').and('be.enabled').and('contain', secondTodo);
    };
};

export default new TodoPage();
