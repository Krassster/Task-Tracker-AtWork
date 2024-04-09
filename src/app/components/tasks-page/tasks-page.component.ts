import { Component, OnInit } from '@angular/core';
import { TaskFilterService } from 'src/app/service/task-filter.service';
import { Task, TaskManagementService } from 'src/app/service/task.service';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss'],
})
export class TasksPageComponent implements OnInit {
  projects: string[] = [];

  tasks: Task[] = [];
  constructor(
    private taskService: TaskManagementService,
    private taskFilterService: TaskFilterService
  ) {}
  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
    this.getUniqueProjects();
  }

  getUniqueProjects(): void {
    this.projects = Array.from(new Set(this.tasks.map((task) => task.project)));
  }

  getTasksByProject(project: string): Task[] {
    return this.tasks.filter((task) => task.project === project);
  }

  sortBy(filter: string) {
    switch (filter) {
      case 'Название':
        this.taskFilterService.sortTasksByTitle();
        break;
      case 'Исполнитель':
        this.taskFilterService.sortTasksByExecutor();
        break;
      case 'Срок':
        this.taskFilterService.sortTasksByDeadline();
        break;
      case 'Приоритет':
        this.taskFilterService.sortTasksByPriority();
        break;
      case 'Статус':
        this.taskFilterService.sortTasksByStatus();
        break;
    }
  }
}
