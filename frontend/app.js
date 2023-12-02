const newTodo = document.getElementById("newTodoInput");
const addTodoButton = document.getElementById("addNewTodoButton");
const allTodos = document.getElementById("allTodoList");
const allTab = document.getElementById("allTab");
const pendingTab = document.getElementById("pendingTab");
const doneTab = document.getElementById("doneTab");
const todos = [];
let viewTodos = [];

const addTodo = (id, name, status) => {
    todos.push({ id, name, status })
}

const renderTodo = (id, name, status = "Pending") => {

    const newTodoDiv = document.createElement("div");
    newTodoDiv.setAttribute("class", "new-todo-div");
    allTodos.appendChild(newTodoDiv);
    newTodoDiv.id = id;

    const newAddedTodo = document.createElement("li");
    newAddedTodo.setAttribute("class", "new-added-todo");
    newAddedTodo.innerText = name;
    newTodoDiv.appendChild(newAddedTodo);

    newTodo.value = "";

    //DONE BUTTON
    const doneButton = document.createElement("input");
    doneButton.setAttribute("class", "done-todo-button");
    doneButton.setAttribute("type", "checkbox");
    doneButton.checked = status === "Done";
    newTodoDiv.appendChild(doneButton);

    doneButton.addEventListener("click", (e) => {

        if (newAddedTodo.style.textDecoration === "line-through") {
            newAddedTodo.style.textDecoration = "none";
            todos[id].status = "Pending";
        } else {
            newAddedTodo.style.textDecoration = "line-through";
            todos[id].status = "Done";
        }
    });


    //DELETE BUTTON
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "delete-todo-button");
    deleteButton.innerText = "DELETE";
    newTodoDiv.appendChild(deleteButton);

    deleteButton.addEventListener("click", (e) => {
        let item = e.target;
        item.parentElement.remove();
    });

    if (status === "Done") {
        newAddedTodo.style.textDecoration = "line-through";
    }

};

allTab.addEventListener("click", (e) => {

    allTodos.innerHTML = "";

    if (allTab.classList.contains("active")) {
        allTab.classList.remove("active");
        return;
    }

    pendingTab.classList.remove("active");
    doneTab.classList.remove("active");

    allTab.classList.add("active");

    todos.forEach(todo => {
        renderTodo(todo.id, todo.name, todo.status);
    });

});

pendingTab.addEventListener("click", (e) => {

    allTodos.innerHTML = "";

    if (pendingTab.classList.contains("active")) {
        pendingTab.classList.remove("active");
        return;
    }

    allTab.classList.remove("active");
    doneTab.classList.remove("active");

    pendingTab.classList.add("active")

    const pendingTodo = todos.filter(todo => {
        return todo.status === "Pending";
    });

    pendingTodo.forEach(todo => {
        renderTodo(todo.id, todo.name, todo.status);
    });
});

doneTab.addEventListener("click", (e) => {

    allTodos.innerHTML = "";

    if (doneTab.classList.contains("active")) {
        doneTab.classList.remove("active");
        return;
    };

    allTab.classList.remove("active");
    pendingTab.classList.remove("active");

    doneTab.classList.add("active");

    const doneTodo = todos.filter(todo => {
        return todo.status === "Done";
    });

    doneTodo.forEach(todo => {
        renderTodo(todo.id, todo.name, todo.status);
    });



});

addTodoButton.addEventListener("click", (e) => {
    e.preventDefault();
    const todoId = todos.length;
    const todoValue = newTodo.value;
    const todoStatus = "Pending"
    addTodo(todoId, todoValue, todoStatus)
    renderTodo(todoId, todoValue, todoStatus);
});


