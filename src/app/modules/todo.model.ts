import { ITodoType } from '../component/todo-list/todo-list.component';

export interface ITodo {
  id: string;
  title: string;
  description: string;
  status: ITodoType;
  created_at: Date;
  done_at?: Date;
  deviation?: { day: number; hour: number; minute: number; second: number };
}
