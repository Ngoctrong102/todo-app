// Lấy các phần tử DOM
const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const toggleDarkMode = document.getElementById('toggleDarkMode');

// Lấy danh sách nhiệm vụ từ LocalStorage hoặc mảng rỗng
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let darkMode = JSON.parse(localStorage.getItem('darkMode')) || false;

// Khởi tạo danh sách từ LocalStorage
function initTodos() {
    todoList.innerHTML = ''; // Xóa danh sách hiện tại
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = todo.completed ? 'completed' : '';

        // Phần mô tả nhiệm vụ
        const span = document.createElement('span');
        span.textContent = todo.text;
        span.style.textDecoration = todo.completed ? 'line-through' : '';
        span.style.color = todo.completed ? 'gray' : '';

        // Checkbox đánh dấu hoàn thành
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => toggleComplete(index));

        // Nút xóa
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        const deleteIcon = document.createElement('img');
        deleteIcon.src = '/images/delete-icon.png';
        deleteIcon.alt = 'Delete';
        deleteBtn.appendChild(deleteIcon);
        deleteBtn.addEventListener('click', () => deleteTodo(index));

        // Thêm các thành phần vào danh sách
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}

// Thêm một nhiệm vụ mới
function addTodo(event) {
    event.preventDefault(); // Ngăn nạp lại trang
    const todoText = todoInput.value.trim();
    if (todoText === '') {
        alert('Please enter a task!');
        return;
    }

    // Thêm nhiệm vụ vào danh sách
    todos.push({ text: todoText, completed: false });
    saveTodos();
    initTodos();
    todoInput.value = ''; // Xóa nội dung ô nhập
}

// Đánh dấu hoàn thành
function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    initTodos();
}

// Xóa nhiệm vụ
function deleteTodo(index) {
    todos.splice(index, 1); // Xóa nhiệm vụ khỏi danh sách
    saveTodos();
    initTodos();
}

// Lưu danh sách vào LocalStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Xử lý Dark Mode
function toggleDarkModeHandler() {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-mode', darkMode);
    toggleDarkMode.textContent = darkMode ? '☀ Light Mode' : '🌙 Dark Mode';
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
}

// Khởi tạo Dark Mode
function initDarkMode() {
    if (darkMode) {
        document.body.classList.add('dark-mode');
        toggleDarkMode.textContent = '☀ Light Mode';
    } else {
        document.body.classList.remove('dark-mode');
        toggleDarkMode.textContent = '🌙 Dark Mode';
    }
}

// Khởi tạo sự kiện và danh sách
todoForm.addEventListener('submit', addTodo);
toggleDarkMode.addEventListener('click', toggleDarkModeHandler);
initTodos();
initDarkMode();
