import {
  createReducer,
  on,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import { Task } from '../service/data.service';
import * as TaskActions from './task.actions';

export interface State {
  tasks: Task[];
}

export const initialState: State = {
  tasks: [],
};

export const selectTaskState = createFeatureSelector<State>('tasks');
export const selectAllTasks = createSelector(
  selectTaskState,
  (state: State) => state.tasks
);

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks,
  })),

  on(TaskActions.addTask, (state, { task }) => {
    const addTask = [...state.tasks, task];

    localStorage.setItem('tasks', JSON.stringify(addTask));
    return { ...state, tasks: addTask };
  }),

  on(TaskActions.updateTask, (state, { id, updatedFields }) => {
    const updatedTasks = state.tasks.map((task) =>
      task.id === id ? { ...task, ...updatedFields } : task
    );

    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    return { ...state, tasks: updatedTasks };
  }),

  on(TaskActions.deleteTask, (state, { id }) => {
    const deleteTask = state.tasks.filter((task) => task.id !== id);

    localStorage.setItem('tasks', JSON.stringify(deleteTask));
    return { ...state, tasks: deleteTask };
  })
);
