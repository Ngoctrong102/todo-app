package com.vng.todos.controller;

import com.vng.todos.entity.TodoItem;
import com.vng.todos.service.TodoService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class TodoController {
  private final TodoService todoService;

  public TodoController(TodoService todoService) {
    this.todoService = todoService;
  }

  @GetMapping("/")
  public String showTodoList(Model model) {
    model.addAttribute("todos", todoService.getAllTodos());
    model.addAttribute("todoItem", new TodoItem());
    return "todo-list";
  }

  @PostMapping("/add")
  public String addTodo(@ModelAttribute TodoItem todoItem) {
    todoService.saveTodo(todoItem);
    return "redirect:/";
  }

  @GetMapping("/delete/{id}")
  public String deleteTodo(@PathVariable Long id) {
    todoService.deleteTodoById(id);
    return "redirect:/";
  }

  @PostMapping("/toggle")
  public String toggleTodoStatus(@RequestParam Long id) {
    todoService.toggleTodoStatus(id);
    return "redirect:/";
  }
}
