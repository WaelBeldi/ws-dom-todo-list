window.addEventListener("load", () => {
  // if there is a todos saved in our localstorage
  // find it, parse it with JSON.parse() and return it as javascript object
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  const newTodoForm = document.querySelector("#new-todo-form");

  newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const todo = {
      // target the value of the element named content
      content: e.target.elements.content.value,
      done: false,
    };

    if (todo.content === "") {
      alert("Please fill the todo content.");
    } else {
      // add the new todo to todos
      todos.push(todo);

      // save todos in localStorage as json string
      localStorage.setItem("todos", JSON.stringify(todos));

      // Reset the form
      e.target.reset();
    }

    DisplayTodos();
  });

  DisplayTodos();
});

function DisplayTodos() {
  const todoList = document.querySelector("#todo-list");
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const content = document.createElement("div");
    const actions = document.createElement("div");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    input.type = "checkbox";
    input.checked = todo.done; //true or false
    span.classList.add("bubble");

    content.classList.add("todo-content");

    actions.classList.add("actions");
    editButton.classList.add("edit");
    deleteButton.classList.add("delete");

    content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
    editButton.innerHTML = "Edit";
    deleteButton.innerHTML = "Delete";

    label.appendChild(input);
    label.appendChild(span);
    actions.appendChild(editButton);
    actions.appendChild(deleteButton);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);

    todoList.appendChild(todoItem);

    if (todo.done) {
      todoItem.classList.add("done");
    }

    input.addEventListener("click", (e) => {
      todo.done = e.target.checked;
      localStorage.setItem("todos", JSON.stringify(todos));

      if (todo.done) {
        todoItem.classList.add("done");
      } else {
        todoItem.classList.remove("done");
      }

      DisplayTodos();
    });

    editButton.addEventListener("click", (e) => {
      const input = content.querySelector("input");
      input.removeAttribute("readonly");
      input.focus();
      input.addEventListener("blur", (e) => {
        input.setAttribute("readonly", true);
        todo.content = e.target.value;
        localStorage.setItem("todos", JSON.stringify(todos));
        DisplayTodos();
      });
    });

    deleteButton.addEventListener("click", (e) => {
      // e.target.parentElement.parentElement.remove()
      todos = todos.filter((t) => t != todo);
      localStorage.setItem("todos", JSON.stringify(todos));
      DisplayTodos();
    });
  });
}
