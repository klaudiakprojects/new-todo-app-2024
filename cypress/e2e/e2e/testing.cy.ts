/// <reference types="cypress" />

import { Client } from 'pg';
import TodoPage from '../../pages/todo-pom.ts';

async function clearDatabase() {
  const client = new Client({
    user: 'postgres',
    password: 'postgres',
    database: 'postgres'
  })
  await client.connect();

  const res = await client.query('DELETE FROM todos');
  await client.end();
};

describe('example to-do app', () => {

  beforeEach(async (async) => {
    await clearDatabase();
    cy.visit('http://127.0.0.1:5500/frontend/index.html');
  })
  

  it('should add a new todo', () => {
    TodoPage.addNewTodo();
    TodoPage.newAddedTodo().should('be.visible');
});

});
