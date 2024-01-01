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
  const todoPOM = new TodoPOM(page);

  await clearDatabase();
  await todoPOM.goto();

});

test.afterAll(async ({ page },) => {
  await clearDatabase();
});

test('Adding new todo', async ({ page }) => {
  const todoPOM = new TodoPOM(page);

  await todoPOM.addNewTodo(testData.firstTodo);
});

test('Edit todo', async ({ page }) => {
  const todoPOM = new TodoPOM(page);

  await todoPOM.editTodo(testData.firstTodo, testData.secondTodo);
});

test('Delete todo', async ({ page }) => {
  const todoPOM = new TodoPOM(page);

  await todoPOM.deleteTodo(testData.firstTodo);
});

test('Adding more todos', async ({ page }) => {
  const todoPOM = new TodoPOM(page);

  await todoPOM.addMoreTodos(testData.firstTodo, testData.secondTodo);
});

test('Checking todo as done', async ({ page }) => {
  const todoPOM = new TodoPOM(page);

  await todoPOM.doneTodo(testData.firstTodo, testData.secondTodo);
});

test('Refreshing the page after adding todos', async ({ page }) => {
  const todoPOM = new TodoPOM(page);

  await todoPOM.refreshPageAfterAddingTodos(testData.firstTodo, testData.secondTodo);
});

test('Deleting all todos', async ({ page }) => {
  const todoPOM = new TodoPOM(page);

  await todoPOM.deletingAllTodos(testData.firstTodo, testData.secondTodo);
});

test('Switching between tabs', async ({ page }) => {
  const todoPOM = new TodoPOM(page);

  await todoPOM.switchingBetweenTabs(testData.firstTodo, testData.secondTodo);
});