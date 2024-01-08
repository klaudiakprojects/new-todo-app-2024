import { test, expect, Page } from '@playwright/test';
import { TodoPOM } from './pages/todo-pom.ts';
import { testData } from './pages/test-data.ts';
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

test.afterEach(async ({ page },) => {
    await clearDatabase();
});

const baseUrl = 'http://127.0.0.1:8888';

test('Get should return empty list', async ({ request }) => {
    const response = await request.get(`${baseUrl}/todos`);
    expect(response.status()).toBe(200);
    expect(await response.json()).toStrictEqual([]);
});

test('Get should return one todo after post request', async ({ request }) => {
    const requestBody = { id: 0, name: 'Learn JavaScript', status: 'Pending' };
    const createTodoRes = await request.post(`${baseUrl}/todos`, {
        data: requestBody
    });
    expect(createTodoRes.status()).toBe(200);

    const getTodosRes = await request.get(`${baseUrl}/todos`);
    expect(getTodosRes.status()).toBe(200);
    expect(await getTodosRes.json()).toStrictEqual([requestBody]);
});

test('Get should return empty list after delete request', async ({ request }) => {
    const requestBody = { id: 0, name: 'Learn js', status: 'Pending' };
    const createTodoRes = await request.post(`${baseUrl}/todos`, {
        data: requestBody
    });
    expect(createTodoRes.status()).toBe(200);

    const getTodosRes = await request.get(`${baseUrl}/todos`);
    expect(getTodosRes.status()).toBe(200);
    expect(await getTodosRes.json()).toStrictEqual([requestBody]);

    const deleteTodoRes = await request.delete(`${baseUrl}/todos/0`);
    expect(deleteTodoRes.status()).toBe(200);

    const getTodosResAfterDelete = await request.get(`${baseUrl}/todos`);
    expect(getTodosResAfterDelete.status()).toBe(200);
    expect(await getTodosResAfterDelete.json()).toStrictEqual([]);
});

test('Get should return edited list after patch request', async ({ request }) => {
    const requestBody = { id: 0, name: 'Learn js', status: 'Pending' };
    const createTodoRes = await request.post(`${baseUrl}/todos`, {
        data: requestBody
    });
    expect(createTodoRes.status()).toBe(200);

    const getTodosRes = await request.get(`${baseUrl}/todos`);
    expect(getTodosRes.status()).toBe(200);
    expect(await getTodosRes.json()).toStrictEqual([requestBody]);

    const updatedName = 'Learn ts';

    const editTodoRes = await request.patch(`${baseUrl}/todos/0`, {
        data: { name: updatedName }
    });
    expect(editTodoRes.status()).toBe(200);

});

test('Get should return empty list after deleting all request', async ({ request }) => {
    const requestBody1 = { id: 0, name: 'Learn js', status: 'Pending' };
    const createTodoRes1 = await request.post(`${baseUrl}/todos`, {
        data: requestBody1
    });
    expect(createTodoRes1.status()).toBe(200);

    const requestBody2 = { id: 1, name: 'Learn ts', status: 'Pending' };
    const createTodoRes2 = await request.post(`${baseUrl}/todos`, {
        data: requestBody2
    });
    expect(createTodoRes2.status()).toBe(200);

    const getTodosResBeforeDelete = await request.get(`${baseUrl}/todos`);
    expect(getTodosResBeforeDelete.status()).toBe(200);
    expect(await getTodosResBeforeDelete.json()).toEqual([
        { id: 0, name: 'Learn js', status: 'Pending' },
        { id: 1, name: 'Learn ts', status: 'Pending' }
    ]);

    const deleteAllTodosRes = await request.delete(`${baseUrl}/todos/`);
    expect(deleteAllTodosRes.status()).toBe(200);

    const getTodosResAfterDelete = await request.get(`${baseUrl}/todos`);
    expect(getTodosResAfterDelete.status()).toBe(200);
    expect(await getTodosResAfterDelete.json()).toEqual([]);

});