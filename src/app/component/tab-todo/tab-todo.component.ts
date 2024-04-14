import { Component, Input } from '@angular/core';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { ITodo } from '../../modules/todo.model';
import { ServiceTodoService } from '../../service/service-todo.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tab-todo',
  standalone: true,
  imports: [TodoListComponent, MatTabsModule, MatCardModule, DatePipe],
  templateUrl: './tab-todo.component.html',
  styleUrl: './tab-todo.component.css',
  providers: [DatePipe],
})
export class TabTodoComponent {
  @Input()
  todoList: any = this.myTodoList.myTodoList;
  currentDate;
  totalDeviation: any = { day: 0, hour: 0, minute: 0, second: 0 };
  totalDoneTask: number = 0;

  filter = 'OPEN';

  onFilter(valueFilter: any) {
    this.myTodoList.indexPage = valueFilter.index;
    if (valueFilter.index === 0) this.filter = 'OPEN';
    if (valueFilter.index === 1) this.filter = 'DONE';
  }
  constructor(
    public myTodoList: ServiceTodoService,
    private datePipe: DatePipe
  ) {
    this.todoList = this.myTodoList.myTodoList;
    this.currentDate = this.datePipe.transform(new Date(), 'MM/dd/YYYY');
  }

  getTitle() {
    if (this.todoList == null) {
      return;
    }

    return this.todoList.filter((char: any) => {
      return char.status === this.filter;
    });
  }

  onChangeTypeMain1(valueTodo: any) {
    if (this.todoList == null) {
      return;
    }

    const pos = this.todoList.findIndex((char: any) => {
      return char.id === valueTodo.id;
    });

    this.myTodoList.myTodoList[pos].status = valueTodo.status;
    this.CountTotalTask();
    this.CountTotalDeviation();
  }

  onDeleteTodo(valueTodo: any) {
    const pos = this.todoList.findIndex((char: any) => {
      return char.id === valueTodo.id;
    });

    this.myTodoList.myTodoList.splice(pos, 1);
  }

  onEditTodo(valueTodo: any) {
    const pos = this.todoList.findIndex((char: any) => {
      return char.id === valueTodo.id;
    });

    this.myTodoList.itemEditTodo = this.todoList[pos];
    this.myTodoList.messageSource?.next('edit');
  }

  CountTotalTask() {
    this.totalDoneTask = this.myTodoList.myTodoList.filter(
      (item: any) => item.status === 'DONE'
    ).length;
  }

  CountTotalDeviation() {
    this.totalDeviation.day = 0;
    this.totalDeviation.hour = 0;
    this.totalDeviation.minute = 0;
    this.totalDeviation.second = 0;
    const totalDay = this.myTodoList.myTodoList.filter(
      (item: any) => item.status === 'DONE'
    );

    for (var i = 0; i < totalDay.length; i++) {
      this.totalDeviation.day += totalDay[i].deviation.day;
      this.totalDeviation.hour += totalDay[i].deviation.hour;
      this.totalDeviation.minute += totalDay[i].deviation.minute;
      this.totalDeviation.second += totalDay[i].deviation.second;
    }
  }
}
