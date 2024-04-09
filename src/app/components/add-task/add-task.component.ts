import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task, TaskManagementService } from 'src/app/service/task.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  showValidationErrors: boolean;

  task: Task = {
    id: '',
    title: '',
    executor: '',
    deadline: { start: '', end: '' },
    priority: { text: '', class: '' },
    status: { text: '', class: '' },
    project: '',
  };

  activePriority: string | null = null;
  activeStatus: string | null = null;

  projects: string[] = [];
  isNewProject: boolean = false;

  constructor(
    private taskService: TaskManagementService,
    private router: Router
  ) {
    this.showValidationErrors = false;
  }
  ngOnInit(): void {
    this.projects = this.taskService.getUniqueProjects();
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    if (true) {
      const newTask: Task = {
        id: uuidv4(),
        title: this.task.title,
        executor: this.task.executor,
        deadline: this.task.deadline,
        priority: {
          text: this.task.priority.text,
          class: this.task.priority.class,
        },
        status: {
          text: this.task.status.text,
          class: this.task.status.class,
        },
        project: this.task.project,
      };

      this.taskService.addTask(newTask);

      this.router.navigateByUrl('');
    }
  }

  toggleNewProject(): void {
    this.isNewProject = !this.isNewProject;
  }

  setPriority(text: string, style: string) {
    this.task.priority.text = text;
    this.task.priority.class = style;
    this.activePriority = style;
  }

  setStatus(text: string, style: string) {
    this.task.status.text = text;
    this.task.status.class = style;
    this.activeStatus = style;
  }
}
