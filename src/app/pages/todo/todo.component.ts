import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  Input,
  ViewChild,
} from '@angular/core';
import { TodoCreateComponent } from '../../component/todo-create/todo-create.component';
import { TabTodoComponent } from '../../component/tab-todo/tab-todo.component';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [TodoCreateComponent, TabTodoComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent {}
