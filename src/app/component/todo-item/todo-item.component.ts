import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITodo } from '../../modules/todo.model';
import { MatExpansionModule } from '@angular/material/expansion';
import { DatePipe, NgIf } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { ServiceTodoService } from '../../service/service-todo.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [MatExpansionModule, MatDividerModule, NgIf],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
  providers: [DatePipe],
})
export class TodoItemComponent {
  panelOpenState = false;
  now = new Date();
  indexPage = this.myService.indexPage;
  @Input()
  todo: any;

  @Output()
  ChangeType = new EventEmitter<ITodo>();

  @Output()
  deleteTodo = new EventEmitter<ITodo>();

  @Output()
  EditTodo = new EventEmitter<ITodo>();

  constructor(
    private datePipe: DatePipe,
    private myService: ServiceTodoService
  ) {}

  onChangeType(valueTodo: ITodo) {
    valueTodo.status = 'DONE';
    valueTodo.done_at = new Date();
    valueTodo.deviation = this.calculateDiff(
      valueTodo.done_at,
      valueTodo.created_at
    );
    console.log(this.calculateDiff(valueTodo.done_at, valueTodo.created_at));

    this.ChangeType.emit(valueTodo);
  }
  onDeleteTodo(valueTodo: ITodo) {
    this.deleteTodo.emit(valueTodo);
  }
  onEditTodo(valueTodo: ITodo) {
    this.EditTodo.emit(valueTodo);
  }

  formatDate(date: Date) {
    return this.datePipe.transform(date, 'MM/dd/YYYY HH:mm:ss');
  }
  calculateDiff(actualDate: Date, deviationDate: Date) {
    var diff = actualDate.getTime() - deviationDate.getTime();
    var days = Math.floor(diff / (60 * 60 * 24 * 1000));
    var hours = Math.floor(diff / (60 * 60 * 1000)) - days * 24;
    var minutes =
      Math.floor(diff / (60 * 1000)) - (days * 24 * 60 + hours * 60);
    var seconds =
      Math.floor(diff / 1000) -
      (days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60);
    return { day: days, hour: hours, minute: minutes, second: seconds };
  }
}
