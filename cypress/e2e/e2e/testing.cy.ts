/// <reference types="cypress" />

import TodoPage from '../../pages/todo-pom.ts';
import { testData } from '../../fixtures/test-data.ts';
import { post } from 'cypress/types/jquery/index';

// function mockGetTodos() {
//   cy.intercept({
//     method: 'GET',
//     url: 'http://127.0.0.1:8888/todos',
//   }, []);
// };

// function mockPostTodos() {
//   cy.intercept({
//     method: 'POST',
//     url: 'http://127.0.0.1:8888/todos',
//   }, []);
// };

// // Funkcja do mockowania DELETE
// function mockDeleteTodos() {
//   cy.intercept({
//     method: 'DELETE',
//     url: 'http://127.0.0.1:8888/todos',
//   }, []);
// };

describe('example to-do app', () => {

  // beforeEach(async () => {
  //   cy.visit('http://127.0.0.1:5500/frontend/index.html');

  // });

  // afterEach(async () => {
  //   cy.get('#deleteAllButton').click();  
 // })


  it('Should add a new todo', () => {
    cy.visit('http://127.0.0.1:5500/frontend/index.html');

    TodoPage.addNewTodo(testData.firstTodo);
    cy.get('#deleteAllButton').click();
  });

  it('Should add more todos', () => {
    cy.visit('http://127.0.0.1:5500/frontend/index.html');

    TodoPage.addMoreTodos(testData.firstTodo, testData.secondTodo);
    cy.get('#deleteAllButton').click();
  });

  it('Should edit todo', () => {
    cy.visit('http://127.0.0.1:5500/frontend/index.html');

    TodoPage.editTodo(testData.firstTodo, testData.secondTodo);
    cy.get('#deleteAllButton').click();
  });

});