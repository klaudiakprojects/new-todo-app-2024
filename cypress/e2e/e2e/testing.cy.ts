/// <reference types="cypress" />

import TodoPage from '../../pages/todo-pom.ts';
import { testData } from '../../fixtures/test-data.ts';
import { post } from 'cypress/types/jquery/index';
import cypress from 'cypress';

async function prepareMocks() {
  mockGetTodos()
  mockPostTodo()
  mockPatchTodo()
}

function mockGetTodos() {
  return cy.intercept({
    method: 'GET',
    url: 'http://127.0.0.1:8888/todos',
  }, []);
};

function mockPostTodo() {
  return cy.intercept({
    method: 'POST',
    url: 'http://127.0.0.1:8888/todos',
  }, []);
};

function mockDeleteTodo() {
  return cy.intercept({
    method: 'DELETE',
    url: 'http://127.0.0.1:8888/todos',
  }, []);
};

function mockPatchTodo() {
  return cy.intercept({
    method: 'PATCH',
    url: 'http://127.0.0.1:8888/todos/*',
  }, []);
};

describe('todo app testing', () => {

  beforeEach(() => {
    prepareMocks()
    cy.visit('localhost:8080');
  });

  it('Should add a new todo', () => {
    TodoPage.addNewTodo(testData.firstTodo);
  });

  it('Should add more todos', () => {
    TodoPage.addMoreTodos(testData.firstTodo, testData.secondTodo);
  });

  it('Should edit todo', () => {
    TodoPage.editTodo(testData.firstTodo, testData.secondTodo);
  });

  it('Should delete todo', () => {
    TodoPage.deleteTodo(testData.firstTodo);
  });

  it('Should check todo as done', () => {
    TodoPage.doneTodo(testData.firstTodo);
  });

  it('Should delete all todos', () => {
    TodoPage.deleteAllTodos(testData.firstTodo, testData.secondTodo);
  });

  it('Should switch between tabs', () => {
    TodoPage.switchingBetweenTabs(testData.firstTodo, testData.secondTodo);
  });

});