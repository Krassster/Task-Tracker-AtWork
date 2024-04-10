import { StatusDetails, TaskStatus } from './../../enums/task-status.enum';
import {
  PriorityDetails,
  TaskPriority,
} from './../../enums/task-priority.enum';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task, TaskManagementService } from 'src/app/service/task.service';
import { v4 as uuidv4 } from 'uuid';
import { Store } from '@ngrx/store';
import { addTask } from 'src/app/store/task.actions';

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

  activePriority: TaskPriority | null = null;
  priorityDetails = PriorityDetails;
  priorities = Object.values(TaskPriority);

  activeStatus: TaskStatus | null = null;
  statusDetails = StatusDetails;
  statuses = Object.values(TaskStatus);

  projects: string[] = [];
  isNewProject: boolean = false;

  constructor(
    private taskService: TaskManagementService,
    private router: Router,
    private store: Store
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

      this.store.dispatch(addTask({ task: newTask }));

      this.router.navigateByUrl('');
    }
  }

  toggleNewProject(): void {
    this.isNewProject = !this.isNewProject;
  }

  setPriority(priority: TaskPriority) {
    this.activePriority = priority;
  }

  setStatus(status: TaskStatus) {
    this.activeStatus = status;
  }

  goBack() {
    this.router.navigateByUrl('');
  }
}
