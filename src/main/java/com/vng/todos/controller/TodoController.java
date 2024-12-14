package com.vng.todos.controller;

import com.vng.todos.entity.TodoItem;
import com.vng.todos.service.TodoService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/")
public class TodoController {
  private final TodoService todoService;

  public TodoController(TodoService todoService) {
    this.todoService = todoService;
  }

  // Trả về HTML trang chính (CSR)
  @GetMapping
  public String showTodoList(Model model) {
    model.addAttribute("todos", todoService.getAllTodos());
    return "todo-list"; // Trả về file HTML từ thư mục templates
  }

  // API: Lấy danh sách Todo (RESTful)
  @ResponseBody
  @GetMapping("/api/todos")
  public List<TodoItem> getAllTodos() {
    return todoService.getAllTodos();
  }

  // API: Thêm Todo mới
  @ResponseBody
  @PostMapping("/api/todos")
  public TodoItem addTodo(@RequestBody TodoItem todoItem) {
    return todoService.saveTodo(todoItem);
  }

  // API: Xóa Todo theo ID
  @ResponseBody
  @DeleteMapping("/api/todos/{id}")
  public void deleteTodo(@PathVariable Long id) {
    todoService.deleteTodoById(id);
  }

  // API: Toggle trạng thái completed
  @ResponseBody
  @PutMapping("/api/todos/{id}/toggle")
  public TodoItem toggleTodoStatus(@PathVariable Long id) {
    return todoService.toggleTodoStatus(id);
  }
}


