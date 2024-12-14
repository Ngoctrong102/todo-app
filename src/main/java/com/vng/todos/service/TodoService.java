package com.vng.todos.service;

import com.vng.todos.entity.TodoItem;
import com.vng.todos.repository.TodoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {
  private final TodoRepository todoRepository;

  public TodoService(TodoRepository todoRepository) {
    this.todoRepository = todoRepository;
  }

  public List<TodoItem> getAllTodos() {
    return todoRepository.findAll();
  }

  public void saveTodo(TodoItem todoItem) {
    todoRepository.save(todoItem);
  }

  public void deleteTodoById(Long id) {
    todoRepository.deleteById(id);
  }

  public void toggleTodoStatus(Long id) {
    TodoItem todo = todoRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid Todo ID: " + id));
    todo.setCompleted(!todo.isCompleted());
    todoRepository.save(todo);
  }
}
