import { Injectable } from '@angular/core';

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
export class DataService {
  private localStorageKey = 'tasks';
  private tasks: Task[] = [
    {
      id: '1',
      title: 'Отрисовать проект',
      executor: 'Алекс К.',
      deadline: {
        start: '2024-04-05',
        end: '2024-04-06',
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
        start: '2024-04-08',
        end: '2024-04-09',
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
        start: '2024-04-10',
        end: '2024-04-11',
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

  constructor() {}

  loadState(): Task[] {
    const tasksInStorage = localStorage.getItem(this.localStorageKey);

    if (tasksInStorage) {
      const parsedTasks = JSON.parse(tasksInStorage);
      return parsedTasks;
    } else {
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.tasks));
      return this.tasks;
    }
  }

  saveTasks(tasks: Task[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
  }

  getTask(id: string): Task | undefined {
    return this.loadState().find((task) => task.id === id);
  }

  getTasks(): Task[] {
    return this.loadState();
  }

  getUniqueProjects(): string[] {
    return Array.from(new Set(this.loadState().map((task) => task.project)));
  }
}
