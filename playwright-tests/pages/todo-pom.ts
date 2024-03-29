import { expect, Locator, Page } from '@playwright/test';

export class TodoPOM {
  readonly page: Page;
  readonly newTodoInput: Locator;
  readonly newTodoButton: Locator;
  readonly newAddedTodo: Locator;
  readonly editTodoInput: Locator;
  readonly deleteTodoButton: Locator;
  readonly allTabButton: Locator;
  readonly pendingTabButton: Locator;
  readonly doneTabButton: Locator;
  readonly allTodoList: Locator;
  readonly doneTodoButton: Locator;
  readonly deleteAllTodosButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTodoInput = page.locator('#newTodoInput');
    this.newTodoButton = page.locator('#addNewTodoButton');
    this.newAddedTodo = page.locator('.new-added-todo');
    this.editTodoInput = page.locator('.edit-todo-input');
    this.deleteTodoButton = page.locator('.delete-todo-button');
    this.allTabButton = page.locator('#allTab');
    this.pendingTabButton = page.locator('#pendingTab');
    this.doneTabButton = page.locator('#doneTab');
    this.allTodoList = page.locator('#allTodoList');
    this.doneTodoButton = page.locator('.done-todo-button');
    this.deleteAllTodosButton = page.locator('#deleteAllButton');
  }

  async getIDs(): Promise<string[]> {
    const todoContainers = await Promise.all(await this.allTodoList.locator('div').all());
    const todoIDs = await Promise.all(todoContainers.map(async (todo) => {
      return await todo.getAttribute('id') as string;
    }));
    return todoIDs;
  }

  async goto(): Promise<void> {
    await this.page.goto('localhost:8080');
  }

  async addNewTodo(firstTodo: string): Promise<void> {
    await this.newTodoInput.fill(firstTodo);
    await this.newTodoButton.click();
    await this.newAddedTodo.waitFor({ state: "visible" })
    expect(this.newAddedTodo).toContainText(firstTodo);
    const todoIDs = await this.getIDs();
    expect(todoIDs).toHaveLength(1);
    expect(todoIDs[0]).toEqual('0');
    expect(this.newAddedTodo).toHaveCount(1);
  };

  async editTodo(firstTodo: string, secondTodo: string): Promise<void> {
    await this.addNewTodo(firstTodo);
    await this.newAddedTodo.click();
    await this.editTodoInput.fill(secondTodo);
    await this.page.keyboard.press('Enter');
    await this.newAddedTodo.waitFor({ state: "visible" });
    expect(this.newAddedTodo).toContainText(secondTodo);
    const todoIDs = await this.getIDs();
    expect(todoIDs).toHaveLength(1);
    expect(todoIDs[0]).toEqual('0');
    expect(this.newAddedTodo).toHaveCount(1);
  };

  async deleteTodo(firstTodo: string): Promise<void> {
    await this.addNewTodo(firstTodo);
    await this.deleteTodoButton.click();
    expect(this.newAddedTodo).not.toBeVisible();
  };

  async addMoreTodos(firstTodo: string, secondTodo: string) {
    await this.addNewTodo(firstTodo);
    await this.newTodoInput.fill(secondTodo);
    await this.newTodoButton.click();
    await this.newAddedTodo.nth(1).waitFor({ state: "visible" })
    await expect(this.newAddedTodo.first()).toContainText(firstTodo);
    await expect(this.newAddedTodo.nth(1)).toContainText(secondTodo);
    const todoIDs = await this.getIDs();
    expect(todoIDs).toHaveLength(2);
    expect(todoIDs[0]).toEqual('0');
    expect(todoIDs[1]).toEqual('1');
    expect(this.newAddedTodo).toHaveCount(2);
    };

  async doneTodo(firstTodo: string, secondTodo: string) {
    await this.addMoreTodos(firstTodo, secondTodo);
    await this.doneTodoButton.first().check();
    expect(this.doneTodoButton.first()).toBeChecked();
    expect(this.newAddedTodo.first()).toHaveAttribute('style', 'text-decoration: line-through;');
    expect(this.newAddedTodo).toHaveCount(2);
    await this.doneTabButton.click();
    expect(this.newAddedTodo.first()).toHaveAttribute('style', 'text-decoration: line-through;');
    expect(this.newAddedTodo).toHaveCount(1);
  };

  async refreshPageAfterAddingTodos(firstTodo: string, secondTodo: string) {
    await this.addMoreTodos(firstTodo, secondTodo);
    await this.page.reload();
    const todos = await this.newAddedTodo.all();
    for (const todo of todos) {
      await todo.waitFor({ state: "visible" });
    };
    expect(this.newAddedTodo).toHaveCount(2);
  };

  async deletingAllTodos(firstTodo: string, secondTodo: string) {
    await this.addMoreTodos(firstTodo, secondTodo);
    await this.deleteAllTodosButton.click();
    expect(this.newAddedTodo).not.toBeVisible();
  }

  async switchingBetweenTabs(firstTodo: string, secondTodo: string): Promise<void> {
    await this.addMoreTodos(firstTodo, secondTodo);
    await this.doneTodoButton.first().check();
    expect(this.doneTodoButton.first()).toBeChecked();
    expect(this.newAddedTodo.first()).toHaveAttribute('style', 'text-decoration: line-through;');
    expect(this.newAddedTodo).toHaveCount(2);
    await this.doneTabButton.click();
    await this.newAddedTodo.waitFor({ state: "visible" });
    expect(this.newAddedTodo).toHaveCount(1);
    await this.pendingTabButton.click();
    await this.newAddedTodo.waitFor({ state: "visible" });
    expect(this.newAddedTodo).toHaveCount(1);
    await this.allTabButton.click();
    const todos = await this.newAddedTodo.all();
    for (const todo of todos) {
      await todo.waitFor({ state: "visible" });
    };
  };

};