// API Endpoint
const apiBase = "/api/todos";

// DOM Elements
const todoList = document.getElementById("todoList");
const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");

// Fetch danh sách Todo từ API
async function fetchTodos() {
    const response = await fetch(apiBase);
    const todos = await response.json();
    renderTodos(todos);
}

// Render danh sách Todo
function renderTodos(todos) {
    todoList.innerHTML = ""; // Xóa danh sách hiện tại

    todos.forEach((todo) => {
        const li = document.createElement("li");
        li.className = todo.completed ? "completed" : "";

        // Checkbox (hoàn thành)
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;
        checkbox.addEventListener("change", () => toggleTodo(todo.id));

        // Nội dung nhiệm vụ
        const span = document.createElement("span");
        span.textContent = todo.description;

        // Nút xóa
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        const deleteIcon = document.createElement("img");
        deleteIcon.src = "/images/delete-icon.png";
        deleteIcon.alt = "Delete";
        deleteBtn.appendChild(deleteIcon);
        deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

        // Gắn các thành phần vào thẻ <li>
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        // Thêm vào danh sách
        todoList.appendChild(li);
    });
}

// Thêm Todo mới
async function addTodo(event) {
    event.preventDefault();
    const description = todoInput.value.trim();
    if (!description) {
        alert("Please enter a task!");
        return;
    }

    const response = await fetch(apiBase, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, completed: false }),
    });

    if (response.ok) {
        fetchTodos();
        todoInput.value = ""; // Reset input
    }
}

// Toggle trạng thái hoàn thành
async function toggleTodo(id) {
    const response = await fetch(`${apiBase}/${id}/toggle`, { method: "PUT" });
    if (response.ok) fetchTodos();
}

// Xóa Todo
async function deleteTodo(id) {
    const response = await fetch(`${apiBase}/${id}`, { method: "DELETE" });
    if (response.ok) fetchTodos();
}

// Lắng nghe sự kiện Submit
todoForm.addEventListener("submit", addTodo);

// Khởi động
fetchTodos();
