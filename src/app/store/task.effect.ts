import { TaskManagementService } from './../service/task.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import * as TaskActions from './task.actions';
import { of } from 'rxjs/internal/observable/of';
import { select, Store } from '@ngrx/store';

@Injectable()
export class TaskEffects {
  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.addTask),
      tap((action) => this.taskManagementService.addTask(action.task)),
      map(() => TaskActions.loadTasks())
    )
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.updateTask),
      tap((action) =>
        this.taskManagementService.updateTask(action.id, action.updatedFields)
      ),
      map(() => TaskActions.loadTasks())
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.deleteTask),
      tap((action) => this.taskManagementService.deleteTask(action.id)),
      map(() => TaskActions.loadTasks())
    )
  );

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      tap(() => this.taskManagementService.loadState()),
      map(() =>
        TaskActions.loadTasksSuccess({
          tasks: this.taskManagementService.getTasks(),
        })
      )
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
        withLatestFrom(this.store.pipe(select((state) => state.tasks))),
        tap(([action, tasks]) => {
          localStorage.setItem('tasks', JSON.stringify(tasks));
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private taskManagementService: TaskManagementService,
    private store: Store<{ tasks: TaskManagementService }>
  ) {}
}
