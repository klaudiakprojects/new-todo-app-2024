import { test, expect, Page } from '@playwright/test';
import { TodoPOM } from './pages/todo-pom.spec.ts';
import { testData } from './pages/test-data.spec.ts';
import { Client } from 'pg';

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

test.beforeEach(async ({ page },) => {
  await clearDatabase();
});

test.afterAll(async ({ page },) => {
  await clearDatabase();
});

test('adding new todo', async ({ page }) => {

  const todoPOM = new TodoPOM(page);

  await todoPOM.goto();
  await todoPOM.addNewTodo(testData.firstTodo);
});

test('edit todo', async ({ page }) => {

  const todoPOM = new TodoPOM(page);

  await todoPOM.goto();
  await todoPOM.editTodo(testData.firstTodo, testData.secondTodo);
});

test('delete todo', async ({ page }) => {

  const todoPOM = new TodoPOM(page);

  await todoPOM.goto();
  await todoPOM.deleteTodo(testData.firstTodo);
})

test('adding more todos', async ({ page }) => {

  const todoPOM = new TodoPOM(page);

  await todoPOM.goto();
  await todoPOM.addMoreTodos(testData.firstTodo, testData.secondTodo);
})

test('checking todo as done', async ({ page }) => {

  const todoPOM = new TodoPOM(page);

  await todoPOM.goto();
  await todoPOM.doneTodo(testData.firstTodo, testData.secondTodo);
});

test('refreshing the page after adding todos', async ({ page }) => {

  const todoPOM = new TodoPOM(page);

  await todoPOM.goto();
  await todoPOM.refreshPageAfterAddingTodos(testData.firstTodo, testData.secondTodo);
});