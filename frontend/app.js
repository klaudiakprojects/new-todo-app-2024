const newTodo = document.getElementById('newTodoInput');
const addTodoButton = document.getElementById('addNewTodoButton');
const allTodos = document.getElementById('allTodoList');
const allTab = document.getElementById('allTab');
const pendingTab = document.getElementById('pendingTab');
const doneTab = document.getElementById('doneTab');
const todoAppGrid = document.getElementById('todo-app-grid');
const todoTabsGrid = document.getElementById('todoTabs');
let todos = [];
let viewTodos = [];

allTab.classList.add('active');

const getItemsFromBackend = async () => {
    const response = await fetch('http://127.0.0.1:8888/todos', {
        method: 'get'
    });
    const backendTodos = await response.json();
    backendTodos.forEach(todo => {
        renderTodo(todo.id, todo.name, todo.status);
        todos.push(todo);
    });
};

getItemsFromBackend();

const updateBackendItems = async (id, name, status) => {
    await fetch(`http://127.0.0.1:8888/todos/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ name, status }),
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    });
};

const deleteItemsFromBackend = async (id) => {
    await fetch(`http://127.0.0.1:8888/todos/${id}`, {
        method: 'DELETE',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    });
};

const deleteAllItemsFromBackend = async () => {
    await fetch(`http://127.0.0.1:8888/todos`, {
        method: 'DELETE',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    });
};


const sendItemToBackend = (id, name, status) => {
    fetch('http://127.0.0.1:8888/todos', {
        method: 'post',
        body: JSON.stringify({ id, name, status }),
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    });
};

const addTodo = (id, name, status) => {
    todos.push({ id, name, status });

    sendItemToBackend(id, name, status);
}

const renderTodo = (id, name, status = 'Pending') => {

    const newTodoDiv = document.createElement('div');
    newTodoDiv.setAttribute('class', 'new-todo-div');
    allTodos.appendChild(newTodoDiv);
    newTodoDiv.id = id;

    const newAddedTodo = document.createElement('li');
    newAddedTodo.setAttribute('class', 'new-added-todo ');
    newAddedTodo.innerText = name;
    newTodoDiv.appendChild(newAddedTodo);

    newTodo.value = '';

    //DELETE ALL

    const newAddedTodos = document.querySelectorAll('.newAddedTodo');
    const deleteAllButtonId = 'deleteAllButton';

    if (newAddedTodos.length < 1 && !document.getElementById(deleteAllButtonId)) {
        const deleteAllButton = document.createElement('button');
        deleteAllButton.setAttribute('id', deleteAllButtonId);
        deleteAllButton.setAttribute('class', 'text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900');
        deleteAllButton.textContent = 'DELETE ALL';
        allTodos.insertAdjacentElement('afterend', deleteAllButton);

        deleteAllButton.addEventListener('click', () => {
            for (let todo of todos) {
                const todoElement = document.getElementById(todo.id);
                if (todoElement) {
                    todoElement.remove();
                };
            };
            todos = [];
            deleteAllButton.remove();
            deleteAllItemsFromBackend();
        });
    };

    //DONE BUTTON
    const doneButton = document.createElement('input');
    doneButton.setAttribute('class', 'done-todo-button w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600');
    doneButton.setAttribute('type', 'checkbox');
    doneButton.checked = status === 'Done';
    newTodoDiv.appendChild(doneButton);

    doneButton.addEventListener('click', (e) => {

        if (newAddedTodo.style.textDecoration === 'line-through') {
            newAddedTodo.style.textDecoration = 'none';
            todos[id].status = 'Pending';
        } else {
            newAddedTodo.style.textDecoration = 'line-through';
            todos[id].status = 'Done';
        }
    });


    //DELETE BUTTON
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'delete-todo-button focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900');
    deleteButton.innerText = 'DELETE';
    newTodoDiv.appendChild(deleteButton);

    deleteButton.addEventListener('click', (e) => {
        let item = e.target;
        let itemParentElement = item.parentElement;
        itemParentElement.remove();
        const todoId = itemParentElement.id;
        console.log(todoId)
        todos.splice(todoId, 1);

        deleteItemsFromBackend(todoId);
    });

    if (status === 'Done') {
        newAddedTodo.style.textDecoration = 'line-through';
    }

    //EDIT
    newAddedTodo.addEventListener('click', (e) => {
        const editTodoInput = document.createElement('input');
        editTodoInput.setAttribute('class', 'edit-todo-input');
        editTodoInput.value = newAddedTodo.innerHTML;
        newAddedTodo.replaceWith(editTodoInput);
        editTodoInput.focus();

        editTodoInput.addEventListener('focusout', () => {
            editTodoInput.replaceWith(newAddedTodo);
            newAddedTodo.innerHTML = editTodoInput.value;
        });


        editTodoInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                editTodoInput.replaceWith(newAddedTodo);
                newAddedTodo.innerText = editTodoInput.value;
                todos[id].name = editTodoInput.value;

                updateBackendItems(id, todos[id].name, todos[id].status);
            };
        });

        editTodoInput.addEventListener('keyup', (e) => {
            if (e.key === 'Escape') {
                editTodoInput.replaceWith(newAddedTodo);
            };
        });

    });
};

allTab.addEventListener('click', (e) => {

    allTodos.innerHTML = '';

    if (allTab.classList.contains('active')) {
        allTab.classList.remove('active');
        return;
    };

    pendingTab.classList.remove('active');
    doneTab.classList.remove('active');

    allTab.classList.add('active');

    todos.forEach(todo => {
        renderTodo(todo.id, todo.name, todo.status);
    });

});

pendingTab.addEventListener('click', (e) => {

    allTodos.innerHTML = '';

    if (pendingTab.classList.contains('active')) {
        pendingTab.classList.remove('active');
        return;
    };

    allTab.classList.remove('active');
    doneTab.classList.remove('active');

    pendingTab.classList.add('active')

    const pendingTodo = todos.filter(todo => {
        return todo.status === 'Pending';
    });

    pendingTodo.forEach(todo => {
        renderTodo(todo.id, todo.name, todo.status);
    });
});

doneTab.addEventListener('click', (e) => {

    allTodos.innerHTML = '';

    if (doneTab.classList.contains('active')) {
        doneTab.classList.remove('active');
        return;
    };

    allTab.classList.remove('active');
    pendingTab.classList.remove('active');

    doneTab.classList.add('active');

    const doneTodo = todos.filter(todo => {
        return todo.status === 'Done';
    });

    doneTodo.forEach(todo => {
        renderTodo(todo.id, todo.name, todo.status);
    });
});

addTodoButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(todos)
    const lastTodo = todos[todos.length - 1];
    console.log(lastTodo)
    let todoId = 0;
    if (lastTodo) {
        todoId = lastTodo.id + 1
    }


    const todoValue = newTodo.value;
    const todoStatus = 'Pending'

    if (todoValue === '') {
        return;
    }

    if (doneTab.classList.contains('active') || pendingTab.classList.contains('active')) {
        alert('You cant add new todo in this state!');
        return;
    }

    addTodo(todoId, todoValue, todoStatus);
    renderTodo(todoId, todoValue, todoStatus);

});

