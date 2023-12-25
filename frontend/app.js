const newTodo = document.getElementById('newTodoInput');
const addTodoButton = document.getElementById('addNewTodoButton');
const allTodos = document.getElementById('allTodoList');
const allTab = document.getElementById('allTab');
const pendingTab = document.getElementById('pendingTab');
const doneTab = document.getElementById('doneTab');
const todos = [];
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
    newAddedTodo.setAttribute('class', 'new-added-todo');
    newAddedTodo.innerText = name;
    newTodoDiv.appendChild(newAddedTodo);

    newTodo.value = '';

    //DONE BUTTON
    const doneButton = document.createElement('input');
    doneButton.setAttribute('class', 'done-todo-button');
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
    deleteButton.setAttribute('class', 'delete-todo-button');
    deleteButton.innerText = 'DELETE';
    newTodoDiv.appendChild(deleteButton);

    deleteButton.addEventListener('click', (e) => {
        let item = e.target;
        item.parentElement.remove();
        const todoId = item.parentElement.id;
        todos.splice(todoId, 1);
    });

    if (status === 'Done') {
        newAddedTodo.style.textDecoration = 'line-through';
    }

    //EDIT
    newAddedTodo.addEventListener('click', (e) => {
        const editTodoInput = document.createElement('input');
        editTodoInput.setAttribute('class', 'edit-todo-input');
        editTodoInput.value = '';
        newAddedTodo.replaceWith(editTodoInput);

        editTodoInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                editTodoInput.replaceWith(newAddedTodo);
                newAddedTodo.innerText = editTodoInput.value;
                todos[id].name = editTodoInput.value;
            };
        });
    })
};

allTab.addEventListener('click', (e) => {

    allTodos.innerHTML = '';

    if (allTab.classList.contains('active')) {
        allTab.classList.remove('active');
        return;
    }

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
    }

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
    const todoId = todos.length;
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

