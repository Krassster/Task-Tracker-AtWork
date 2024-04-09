import { Injectable } from '@angular/core';
import { Task, TaskManagementService } from './task.service';

@Injectable({
  providedIn: 'root',
})
export class TaskFilterService {
  private tasks!: Task[];

  private sortTitle: boolean = true;
  private sortExecutor: boolean = true;
  private sortDeadline: boolean = true;
  private sortPriority: boolean = true;
  private sortStatus: boolean = true;

  constructor(private tasksService: TaskManagementService) {
    this.tasks = tasksService.getTasks();
  }

  sortTasksByTitle() {
    this.tasks.sort((a, b) => {
      const comparison = a.title.localeCompare(b.title);
      return this.sortTitle ? comparison : -comparison;
    });
    this.sortTitle = !this.sortTitle;
  }

  sortTasksByExecutor() {
    this.tasks.sort((a, b) => {
      const comparison = a.executor.localeCompare(b.executor);
      return this.sortExecutor ? comparison : -comparison;
    });
    this.sortExecutor = !this.sortExecutor;
  }

  sortTasksByDeadline() {
    this.tasks.sort((a, b) => {
      const dateA = new Date(a.deadline.start);
      const dateB = new Date(b.deadline.start);
      const comparison = dateA.getTime() - dateB.getTime();
      return this.sortDeadline ? comparison : -comparison;
    });
    this.sortDeadline = !this.sortDeadline;
  }

  sortTasksByPriority() {
    const priorityOrder: { [key: string]: number } = {
      low: 0,
      medium: 1,
      high: 2,
    };

    this.tasks.sort((a, b) => {
      const priorityA = priorityOrder[a.priority.class];
      const priorityB = priorityOrder[b.priority.class];
      const comparison = priorityA - priorityB;
      return this.sortPriority ? comparison : -comparison;
    });

    this.sortPriority = !this.sortPriority;
  }

  sortTasksByStatus() {
    const statusOrder: { [key: string]: number } = {
      atWork: 0,
      suspended: 1,
      notStated: 2,
    };

    this.tasks.sort((a, b) => {
      const statusA = statusOrder[a.status.class];
      const statusB = statusOrder[b.status.class];
      const comparison = statusA - statusB;
      return this.sortStatus ? comparison : -comparison;
    });

    this.sortStatus = !this.sortStatus;
  }
}
