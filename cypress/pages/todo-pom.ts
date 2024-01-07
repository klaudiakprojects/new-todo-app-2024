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

    deleteTodoButton() {
        return cy.get('.delete-todo-button');
    };

    doneTodoButton() {
        return cy.get('.done-todo-button');
    };

    doneTabButton() {
        return cy.get('#doneTab');
    };

    pendingTabButton() {
        return cy.get('#pendingTab');
    };

    allTabButton() {
        return cy.get('#allTab');
    };

    allTodosList() {
        return cy.get('#allTodoList');
    }

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
        cy.wait(4000);
        this.editTodoInput().clear().type(secondTodo);
        // this.editTodoInput().first().type('{Enter}');
        // cy.wait(4000);
        
        // this.newAddedTodo().eq(0).should('be.visible').and('be.enabled').and('contain', secondTodo);
    };

    deleteTodo(firstTodo: string) {
        this.addNewTodo(firstTodo);
        this.deleteTodoButton().click();
        this.newAddedTodo().should('not.exist');
    };

    doneTodo(firstTodo: string) {
        this.addNewTodo(firstTodo);
        this.doneTodoButton().click();
        this.newAddedTodo().should('have.attr', 'style', 'text-decoration: line-through;')
        this.doneTabButton().click();
        this.newAddedTodo().should('exist');
        this.newAddedTodo().should('have.attr', 'style', 'text-decoration: line-through;')
    };

    deleteAllTodos(firstTodo: string, secondTodo: string) {
        this.addMoreTodos(firstTodo,secondTodo);
        this.deleteAllTodosButton().click();
        cy.contains(firstTodo).should('not.exist');
        cy.contains(secondTodo).should('not.exist');
    };

    switchingBetweenTabs(firstTodo: string, secondTodo: string) {
        this.addMoreTodos(firstTodo,secondTodo);
        this.doneTodoButton().first().click();
        this.doneTabButton().click();
        cy.contains(firstTodo).should('exist');
        this.pendingTabButton().click();
        cy.contains(secondTodo).should('exist');
        this.allTabButton().click();
        cy.contains(firstTodo).should('exist');
        cy.contains(secondTodo).should('exist');
        // this.allTodosList().should('have.length', 2);
        };
};

export default new TodoPage();
