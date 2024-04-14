import { Injectable } from '@angular/core';
import { todoList } from '../db-data';
import { ITodo } from '../modules/todo.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceTodoService {
  indexPage: number = 0;
  myTodoList: any = todoList;
  itemEditTodo: ITodo = {
    id: '',
    title: '',
    description: '',
    status: 'OPEN',
    created_at: new Date(),
  };
  messageSource: Subject<string> | undefined;
  constructor() {
    this.messageSource = new Subject<string>();
  }
}
