import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgModel,
  NgModelGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ITodo } from '../../modules/todo.model';
import { ServiceTodoService } from '../../service/service-todo.service';
import { NgIf } from '@angular/common';
import { TodoPopupComponent } from '../todo-popup/todo-popup.component';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface DialogData {
  text: '';
}

@Component({
  selector: 'app-todo-create',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatButtonModule,
    NgIf,
    MatTooltipModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './todo-create.component.html',
  styleUrl: './todo-create.component.css',
})
export class TodoCreateComponent {
  @Input()
  showButton: boolean = false;
  valueTaskName: string = '';
  valueTaskDescription: string = '';
  valueTaskDate = new Date();
  date = new Date();
  flagEdit = false;

  todoListTask = this.myTodoList.myTodoList;

  constructor(
    private myTodoList: ServiceTodoService,
    public dialog: MatDialog
  ) {
    this.myTodoList.messageSource?.asObservable().subscribe((value: string) => {
      if (value === 'edit') {
        this.valueTaskName = this.myTodoList.itemEditTodo.title;
        this.valueTaskDescription = this.myTodoList.itemEditTodo.description;
        this.date = this.myTodoList.itemEditTodo.created_at;
        this.flagEdit = true;
      }
    });
  }

  taskName = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
  ]);
  taskDescription = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
  ]);

  errorMessage = '';

  updateErrorMessageTaskName() {
    if (this.taskName.hasError('required')) {
      this.errorMessage = 'You must enter at least 1 character';
    } else {
      this.errorMessage = '';
    }
  }

  updateErrorMessageDescription() {
    if (this.taskDescription.hasError('required')) {
      this.errorMessage = 'You must enter at least 1 character';
    } else {
      this.errorMessage = '';
    }
  }

  onClearInfo() {
    this.valueTaskName = '';
    this.valueTaskDescription = '';
    this.date = new Date();
  }

  onKeyUpTaskName(value: string) {
    this.valueTaskName = value;
  }

  onKeyUpTaskDescription(value: string) {
    this.valueTaskDescription = value;
  }
  onCreateInfo() {
    const newTodo: ITodo = {
      id: new Date().getTime().toString(),
      title: this.valueTaskName,
      description: this.valueTaskDescription,
      status: 'OPEN',
      created_at: new Date(),
    };
    console.log(newTodo);

    this.todoListTask.push(newTodo);
    this.myTodoList.myTodoList = this.todoListTask;
    this.onClearInfo();
  }
  onEditTodo() {
    const pos = this.todoListTask.findIndex((char: any) => {
      return char.id === this.myTodoList.itemEditTodo.id;
    });

    const newTodo: ITodo = {
      id: new Date().getTime().toString(),
      title: this.valueTaskName,
      description: this.valueTaskDescription,
      status: 'OPEN',
      created_at: new Date(),
    };

    this.myTodoList.myTodoList[pos] = newTodo;
    this.flagEdit = false;
    this.onClearInfo();
  }

  onDateChange(value: Date) {
    this.valueTaskDate = value;
  }

  onClickPopupInfo() {
    this.dialog.open(TodoPopupComponent, {
      data: {
        text: this.valueTaskName,
      },
    });
  }

  onClickPopupDescription() {
    this.dialog.open(TodoPopupComponent, {
      data: {
        text: this.valueTaskDescription,
      },
    });
  }
}
