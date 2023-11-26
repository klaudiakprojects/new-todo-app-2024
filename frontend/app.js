const newTodo = document.getElementById("newTodoInput");
const addTodoButton = document.getElementById("addNewTodoButton");
const allTodos = document.getElementById("allTodoList");
const allTab = document.getElementById("allTab");
const pendingTab = document.getElementById("pendingTab");
const doneTab = document.getElementById("doneTab");
const todos = [];

addTodoButton.addEventListener("click", (event) => {

    event.preventDefault();

    let todoName = newTodo.value;
    let todoStatus = '';

    const newTodoDiv = document.createElement("div");
    newTodoDiv.setAttribute("class", "new-todo-div");
    allTodos.appendChild(newTodoDiv);
    newTodoDiv.id = todos.length.toString();

    let newTodoItem = {
        name: todoName,
        status: "Pending"
    };

    todos.push(newTodoItem);

    const newAddedTodo = document.createElement("li");
    newAddedTodo.setAttribute("class", "new-added-todo");
    newAddedTodo.innerText = todoName;
    newTodoDiv.appendChild(newAddedTodo);

    newTodo.value = "";

    console.log("Nowe todo dodane:", newTodoDiv);
    console.log(newTodoItem)

    //DONE BUTTON
    const doneButton = document.createElement("input");
    doneButton.setAttribute("class", "done-todo-button");
    doneButton.setAttribute("type", "checkbox");
    newTodoDiv.appendChild(doneButton);

    doneButton.addEventListener("click", (e) => {

        if (newAddedTodo.style.textDecoration === "line-through") {
            newAddedTodo.style.textDecoration = "none";
            newTodoItem.status = "Pending";
        } else {
            newAddedTodo.style.textDecoration = "line-through";
            newTodoItem.status = "Done";
        }

        console.log(newTodoItem)
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
});

allTab.addEventListener("click", (e) => {

    if (allTab.classList.contains("active")) {
        allTab.classList.remove("active");
        return;
    }

    pendingTab.classList.remove("active");
    doneTab.classList.remove("active");

    allTab.classList.add("active");

});

pendingTab.addEventListener("click", (e) => {

    if (pendingTab.classList.contains("active")) {
        pendingTab.classList.remove("active");
        return;
    }

    allTab.classList.remove("active");
    doneTab.classList.remove("active");

    pendingTab.classList.add("active")
});

doneTab.addEventListener("click", (e) => {

    if (doneTab.classList.contains("active")) {
        doneTab.classList.remove("active");
        return;
    }

    allTab.classList.remove("active");
    pendingTab.classList.remove("active");

    doneTab.classList.add("active")

});



