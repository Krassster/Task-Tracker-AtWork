import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

export interface Task {
  id: string;
  title: string;
  executor: string;
  deadline: {
    start: string;
    end: string;
  };
  priority: {
    text: string;
    class: string;
  };
  status: {
    text: string;
    class: string;
  };
  project: string;
}

@Injectable({
  providedIn: 'root',
})
export class TaskManagementService implements OnDestroy {
  private projects: string[] = [];
  private tasks: Task[] = [
    {
      id: '1',
      title: 'Отрисовать проект',
      executor: 'Алекс К.',
      deadline: {
        start: '2024-04-04',
        end: '2024-04-05',
      },
      priority: {
        text: 'Низкий',
        class: 'low',
      },
      status: {
        text: 'В работе',
        class: 'atWork',
      },
      project: 'Проект №1',
    },
    {
      id: '2',
      title: 'Собрать визуал',
      executor: 'Алекс К.',
      deadline: {
        start: '2024-04-05',
        end: '2024-04-06',
      },
      priority: {
        text: 'Средний',
        class: 'medium',
      },
      status: {
        text: 'Приостановлен',
        class: 'suspended',
      },
      project: 'Проект №1',
    },
    {
      id: '3',
      title: 'Сдать выполненое тз',
      executor: 'Алекс К.',
      deadline: {
        start: '2024-04-08',
        end: '2024-04-09',
      },
      priority: {
        text: 'Высокий',
        class: 'high',
      },
      status: {
        text: 'Не начат',
        class: 'notStated',
      },
      project: 'Проект №2',
    },
  ];

  private sortTitle: boolean = true;

  storageListenSub: Subscription;

  constructor() {
    this.loadState();
    this.projects = Array.from(new Set(this.tasks.map((task) => task.project)));
    this.storageListenSub = fromEvent<StorageEvent>(
      window,
      'storage'
    ).subscribe((event) => {
      if (event.key === 'notes') {
        this.loadState();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.storageListenSub) {
      this.storageListenSub.unsubscribe();
    }
  }

  getTasks() {
    return this.tasks;
  }

  getTask(id: string) {
    return this.tasks.find((t) => t.id === id);
  }

  getUniqueProjects() {
    return this.projects;
  }

  addTask(task: Task) {
    this.tasks.push(task);
    this.saveState();
  }

  updateTask(id: string, updatedFields: Partial<Task>) {
    const task = this.getTask(id);
    if (task) {
      Object.assign(task, updatedFields);
    }
    this.saveState();
  }

  deleteTask(id: string) {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);
    if (taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1);
    }

    this.saveState();
  }

  sortTasksByTitle() {
    this.tasks.sort((a, b) => {
      const comparison = a.title.localeCompare(b.title);
      return this.sortTitle ? comparison : -comparison;
    });
    this.sortTitle = !this.sortTitle;
  }

  sortTasksByExecutor() {
    this.tasks.sort((a, b) => a.executor.localeCompare(b.executor));
  }

  sortTasksByDeadline() {
    this.tasks.sort((a, b) => {
      const dateA = new Date(a.deadline.start);
      const dateB = new Date(b.deadline.start);
      return dateA.getTime() - dateB.getTime();
    });
  }

  sortTasksByPriority() {
    this.tasks.sort((a, b) => a.priority.text.localeCompare(b.priority.text));
  }

  sortTasksByStatus() {
    this.tasks.sort((a, b) => a.status.text.localeCompare(b.status.text));
  }

  saveState() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  loadState() {
    try {
      const tasksInStorage = localStorage.getItem('tasks');
      if (tasksInStorage) {
        const parsedTasks: Task[] = JSON.parse(tasksInStorage);
        this.tasks.length = 0;
        this.tasks.push(...parsedTasks);
      }
    } catch (e) {
      console.error('There was an error task on LocalState');
    }
  }
}
