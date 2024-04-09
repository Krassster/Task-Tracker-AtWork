import { Injectable } from '@angular/core';
import { Task } from './task.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private localStorageKey = 'tasks';

  constructor() {}

  getTasks(): Task[] {
    const tasksInStorage = localStorage.getItem(this.localStorageKey);
    if (tasksInStorage) {
      return JSON.parse(tasksInStorage);
    }

    return [];
  }

  saveTasks(tasks: Task[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
  }
}
