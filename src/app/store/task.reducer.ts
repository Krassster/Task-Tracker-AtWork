import { createReducer, on } from '@ngrx/store';
import { Task } from '../service/task.service';
import * as TaskActions from './task.actions';

export interface State {
  tasks: Task[];
}

export const initialState: State = {
  tasks: [],
};

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks,
  })),

  on(TaskActions.addTask, (state, { task }) => {
    console.log('Reducer adding task', task);
    return {
      ...state,
      tasks: [...state.tasks, task],
    };
  }),

  on(TaskActions.updateTask, (state, { id, updatedFields }) => ({
    ...state,
    tasks: state.tasks.map((task) =>
      task.id === id ? { ...task, ...updatedFields } : task
    ),
  })),

  on(TaskActions.deleteTask, (state, { id }) => ({
    ...state,
    tasks: state.tasks.filter((task) => task.id !== id),
  }))
);
