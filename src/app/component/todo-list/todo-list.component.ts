import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { NgFor } from '@angular/common';
import { ITodo } from '../../modules/todo.model';
export type ITodoType = 'OPEN' | 'PROGRESS' | 'TESTING' | 'DONE';
@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoItemComponent, NgFor],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  @Input()
  todoList: any;

  @Output()
  onChangeType = new EventEmitter<ITodo>();

  @Output()
  onDeleteTodo1 = new EventEmitter<ITodo>();

  @Output()
  EditTodo = new EventEmitter<ITodo>();

  onChangeTypeMain(valueTodo: ITodo) {
    this.onChangeType.emit(valueTodo);
  }
  onDeleteTodo(valueTodo: ITodo) {
    this.onDeleteTodo1.emit(valueTodo);
  }

  onEditTodo(valueTodo: ITodo) {
    this.EditTodo.emit(valueTodo);
  }
}
