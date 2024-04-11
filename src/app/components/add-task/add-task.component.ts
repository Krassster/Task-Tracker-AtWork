import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { v4 as uuidv4 } from 'uuid';
import { Store } from '@ngrx/store';

import { Task, DataService } from 'src/app/service/data.service';
import { StatusDetails, TaskStatus } from './../../enums/task-status.enum';
import { addTask } from 'src/app/store/task.actions';
import {
  PriorityDetails,
  TaskPriority,
} from 'src/app/enums/task-priority.enum';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  validForm: {
    title: boolean;
    executor: boolean;
    startDate: boolean;
    endDate: boolean;
  };

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
  priorityDetails: typeof PriorityDetails = PriorityDetails;
  priorities = Object.values(TaskPriority);

  activeStatus: TaskStatus | null = null;
  statusDetails: typeof StatusDetails = StatusDetails;
  statuses = Object.values(TaskStatus);

  projects: string[] = [];
  isNewProject: boolean = false;

  constructor(
    private router: Router,
    private store: Store,
    private dataService: DataService
  ) {
    this.validForm = {
      title: false,
      executor: false,
      startDate: false,
      endDate: false,
    };
  }
  ngOnInit(): void {
    this.projects = this.dataService.getUniqueProjects();
    this.isNewProject = this.projects.length === 0;
    this.task.deadline.start = new Date().toISOString().split('T')[0];
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const newTask: Task = {
        id: uuidv4(),
        title: this.task.title,
        executor: this.task.executor,
        deadline: {
          start: this.task.deadline.start,
          end: this.task.deadline.end,
        },
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
    } else {
      this.validForm = {
        title: true,
        executor: true,
        startDate: true,
        endDate: true,
      };
    }
  }

  toggleNewProject(): void {
    this.isNewProject = !this.isNewProject;
  }

  setPriority(priority: TaskPriority): void {
    this.activePriority = priority;
    this.task.priority = {
      text: this.priorityDetails[priority].text,
      class: this.priorityDetails[priority].style,
    };
  }

  setStatus(status: TaskStatus): void {
    this.activeStatus = status;
    this.task.status = {
      text: this.statusDetails[status].text,
      class: this.statusDetails[status].style,
    };
  }

  goBack(): void {
    this.router.navigateByUrl('');
  }
}
