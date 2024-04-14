import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { DialogData } from '../todo-create/todo-create.component';

@Component({
  selector: 'app-todo-popup',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent],
  templateUrl: './todo-popup.component.html',
  styleUrl: './todo-popup.component.css',
})
export class TodoPopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
