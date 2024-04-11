import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { DataService, Task } from './../../service/data.service';
import { deleteTask, updateTask } from 'src/app/store/task.actions';
import { StatusDetails, TaskStatus } from 'src/app/enums/task-status.enum';
import {
  PriorityDetails,
  TaskPriority,
} from 'src/app/enums/task-priority.enum';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent {
  validForm: {
    title: boolean;
    executor: boolean;
    startDate: boolean;
    endDate: boolean;
  } = {
    title: false,
    executor: false,
    startDate: false,
    endDate: false,
  };

  task!: Task;

  activePriority: TaskPriority | null = null;
  priorityDetails = PriorityDetails;
  priorities = Object.values(TaskPriority);

  activeStatus: TaskStatus | null = null;
  statusDetails = StatusDetails;
  statuses = Object.values(TaskStatus);

  projects: string[] = [];
  isNewProject: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<{ tasks: Task[] }>,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.projects = this.dataService.getUniqueProjects();

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const idParam = paramMap.get('id');

      if (idParam !== null) {
        const fetchedTask = this.dataService.getTask(idParam);
        if (fetchedTask !== undefined) {
          this.task = { ...fetchedTask };
          this.activePriority = fetchedTask.priority.class as TaskPriority;
          this.activeStatus = fetchedTask.status.class as TaskStatus;
        } else {
          this.validForm = {
            title: true,
            executor: true,
            startDate: true,
            endDate: true,
          };
        }
      }
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    if (true) {
      this.store.dispatch(
        updateTask({ id: this.task.id, updatedFields: { ...this.task } })
      );
      this.router.navigateByUrl('');
    }
  }

  toggleNewProject(): void {
    this.isNewProject = !this.isNewProject;
  }

  setPriority(priority: TaskPriority) {
    this.task = {
      ...this.task,
      priority: {
        ...this.task.priority,
        class: priority,
        text: PriorityDetails[priority].text,
      },
    };
    this.activePriority = priority;
  }

  setStatus(status: TaskStatus) {
    this.task = {
      ...this.task,
      status: {
        ...this.task.status,
        class: status,
        text: StatusDetails[status].text,
      },
    };
    this.activeStatus = status;
  }

  deleteTask() {
    this.store.dispatch(deleteTask({ id: this.task.id }));
    this.goBack();
  }
  goBack() {
    this.router.navigateByUrl('');
  }

  onTitleChange(newTitle: string) {
    this.task = { ...this.task, title: newTitle };
  }

  onExecutorChange(newExecutor: string) {
    this.task = { ...this.task, executor: newExecutor };
  }

  onDeadlineStartChange(newStart: string) {
    this.task = {
      ...this.task,
      deadline: { ...this.task.deadline, start: newStart },
    };
  }

  onDeadlineEndChange(newEnd: string) {
    this.task = {
      ...this.task,
      deadline: { ...this.task.deadline, end: newEnd },
    };
  }

  onProjectChange(newProject: string) {
    this.task = { ...this.task, project: newProject };
  }
}
