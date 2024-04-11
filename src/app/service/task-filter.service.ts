import { Task } from 'src/app/service/data.service';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskFilterService {
  private sortDirection = {
    title: true,
    executor: true,
    deadline: true,
    priority: true,
    status: true,
  };

  constructor(private dataService: DataService) {}

  private toggleSortDirection(key: keyof typeof this.sortDirection): void {
    this.sortDirection[key] = !this.sortDirection[key];
  }

  private getTasks(): Task[] {
    return this.dataService.getTasks();
  }

  sortTasksByTitle(): Task[] {
    const tasks = this.getTasks().sort((a, b) => {
      const comparison = a.title.localeCompare(b.title);
      return this.sortDirection.title ? comparison : -comparison;
    });
    this.toggleSortDirection('title');
    return tasks;
  }

  sortTasksByExecutor(): Task[] {
    const tasks = this.getTasks().sort((a, b) => {
      const comparison = a.executor.localeCompare(b.executor);
      return this.sortDirection.executor ? comparison : -comparison;
    });
    this.toggleSortDirection('executor');
    return tasks;
  }

  sortTasksByDeadline(): Task[] {
    const tasks = this.getTasks().sort((a, b) => {
      const dateA = new Date(a.deadline.start);
      const dateB = new Date(b.deadline.start);
      return this.sortDirection.deadline
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });
    this.toggleSortDirection('deadline');
    return tasks;
  }

  sortTasksByPriority(): Task[] {
    const priorityOrder: { [key: string]: number } = {
      low: 0,
      medium: 1,
      high: 2,
    };

    const tasks = this.getTasks().sort((a, b) => {
      const priorityA = priorityOrder[a.priority.class];
      const priorityB = priorityOrder[b.priority.class];
      const comparison = priorityA - priorityB;
      return this.sortDirection.priority ? comparison : -comparison;
    });
    this.toggleSortDirection('priority');
    return tasks;
  }

  sortTasksByStatus(): Task[] {
    const statusOrder: { [key: string]: number } = {
      atWork: 0,
      suspended: 1,
      notStarted: 2,
    };

    const tasks = this.getTasks().sort((a, b) => {
      const statusA = statusOrder[a.status.class];
      const statusB = statusOrder[b.status.class];
      const comparison = statusA - statusB;
      return this.sortDirection.status ? comparison : -comparison;
    });
    this.toggleSortDirection('status');
    return tasks;
  }
}
