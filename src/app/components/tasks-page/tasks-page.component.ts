import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { select, Store } from '@ngrx/store';

import { TaskFilterService } from 'src/app/service/task-filter.service';
import { DataService, Task } from 'src/app/service/data.service';
import { selectAllTasks } from 'src/app/store/task.reducer';
import { initTasks } from 'src/app/store/task.actions';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss'],
})
export class TasksPageComponent implements OnInit {
  tasks$: Observable<Task[]> = this.store.pipe(select(selectAllTasks));
  projects: string[] = [];

  tasks: Task[] = [];
  constructor(
    private router: Router,
    private store: Store<{ tasks: Task[] }>,
    private dataService: DataService,
    private taskFilterService: TaskFilterService
  ) {
    this.store.dispatch(initTasks());
  }

  ngOnInit(): void {
    this.tasks = this.dataService.loadState();
    this.getUniqueProjects();
  }

  getUniqueProjects(): void {
    this.projects = Array.from(new Set(this.tasks.map((task) => task.project)));
  }

  getTasksByProject(project: string): Task[] {
    return this.tasks.filter((task) => task.project === project);
  }

  sortBy(filter: string): void {
    switch (filter) {
      case 'Название':
        this.tasks = this.taskFilterService.sortTasksByTitle();
        break;
      case 'Исполнитель':
        this.tasks = this.taskFilterService.sortTasksByExecutor();
        break;
      case 'Срок':
        this.tasks = this.taskFilterService.sortTasksByDeadline();
        break;
      case 'Приоритет':
        this.tasks = this.taskFilterService.sortTasksByPriority();
        break;
      case 'Статус':
        this.tasks = this.taskFilterService.sortTasksByStatus();
        break;
    }
  }

  goToAddPage(): void {
    this.router.navigateByUrl('add');
  }
}
