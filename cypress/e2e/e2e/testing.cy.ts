/// <reference types="cypress" />

import TodoPage from '../../pages/todo-pom.ts';
import { testData } from '../../fixtures/test-data.ts';
import { post } from 'cypress/types/jquery/index';

describe('example to-do app', () => {

  beforeEach(async () => {
    // cy.task('clearDatabase');
    cy.visit('http://127.0.0.1:5500/frontend/index.html');
  })
  

  it('should add a new todo', () => {
    TodoPage.addNewTodo(testData.firstTodo);
    TodoPage.newAddedTodo().should('be.visible');
});

});