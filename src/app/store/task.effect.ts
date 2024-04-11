import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { exhaustMap, map, tap, withLatestFrom } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';

import * as TaskActions from './task.actions';
import { Task, DataService } from '../service/data.service';
import { selectAllTasks } from './task.reducer';

@Injectable()
export class TaskEffects {
  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.addTask),
      map(() => TaskActions.loadTasks())
    )
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.updateTask),
      map(() => TaskActions.loadTasks())
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.deleteTask),
      map(() => TaskActions.loadTasks())
    )
  );

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      exhaustMap(() => {
        const tasks = this.dataService.loadState();
        return of(TaskActions.loadTasksSuccess({ tasks }));
      })
    )
  );

  saveTasksToLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          TaskActions.addTask,
          TaskActions.updateTask,
          TaskActions.deleteTask
        ),
        withLatestFrom(this.store.pipe(select(selectAllTasks))),
        tap(([action, tasks]) => {
          this.dataService.saveTasks(tasks);
        })
      ),
    { dispatch: false }
  );

  initTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.initTasks),
      map(() => {
        const tasks = this.dataService.loadState();
        if (tasks.length === 0) {
          this.dataService.saveTasks(this.dataService.getTasks());
        }
        return TaskActions.loadTasksSuccess({ tasks });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<{ tasks: Task[] }>,
    private dataService: DataService
  ) {}
}
