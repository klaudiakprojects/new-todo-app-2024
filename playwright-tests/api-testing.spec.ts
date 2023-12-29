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

const baseUrl = 'http://127.0.0.1:8888';

test('Get should return empty list', async ({ request }) => {
    const response = await request.get(`${baseUrl}/todos`);
    expect(response.status()).toBe(200);
    expect(await response.json()).toStrictEqual([]);
});

test('Get should return one todo after post request', async ({ request }) => {
    const requestBody = { id: 0, name: 'Learn js', status: 'Pending' };
    const createTodoRes = await request.post(`${baseUrl}/todos`, {
        data: requestBody
    });
    expect(createTodoRes.status()).toBe(200);

    const getTodosRes = await request.get(`${baseUrl}/todos`);
    expect(getTodosRes.status()).toBe(200);
    expect(await getTodosRes.json()).toStrictEqual([requestBody]);
});