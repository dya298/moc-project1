import { Routes } from '@angular/router';
import { DefaultComponent } from './layout/default/default.component';
import { MasterComponent } from './layout/master/master.component';
import { TodoComponent } from './pages/todo/todo.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [{ path: '', component: LoginComponent }],
  },
  {
    path: '',
    component: MasterComponent,
    children: [{ path: 'todo', component: TodoComponent }],
  },
];
