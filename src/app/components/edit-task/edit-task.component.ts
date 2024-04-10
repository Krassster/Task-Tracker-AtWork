import { updateTask } from 'src/app/store/task.actions';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
  PriorityDetails,
  TaskPriority,
} from 'src/app/enums/task-priority.enum';
import { StatusDetails, TaskStatus } from 'src/app/enums/task-status.enum';
import { Task, TaskManagementService } from 'src/app/service/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent {
  showValidationErrors: boolean;

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
    private taskService: TaskManagementService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {
    this.showValidationErrors = false;
  }
  ngOnInit(): void {
    this.projects = this.taskService.getUniqueProjects();

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const idParam = paramMap.get('id');

      if (idParam !== null) {
        const fetchedTask = this.taskService.getTask(idParam);
        if (fetchedTask !== undefined) {
          this.task = fetchedTask;
          this.activePriority = fetchedTask.priority.class as TaskPriority;
          this.activeStatus = fetchedTask.status.class as TaskStatus;
        } else {
        }
      }
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    if (true) {
      this.store.dispatch(
        updateTask({ id: this.task.id, updatedFields: this.task })
      );
      // this.taskService.updateTask(this.task.id, this.task);
      this.router.navigateByUrl('');
    }
  }

  toggleNewProject(): void {
    this.isNewProject = !this.isNewProject;
  }

  setPriority(priority: TaskPriority) {
    this.activePriority = priority;
    this.task.priority.class = priority;
    this.task.priority.text = PriorityDetails[priority].text;
  }

  setStatus(status: TaskStatus) {
    this.activeStatus = status;
    this.task.status.class = status;
    this.task.status.text = StatusDetails[status].text;
  }

  deleteTask() {
    this.taskService.deleteTask(this.task.id);
    this.goBack();
  }
  goBack() {
    this.router.navigateByUrl('');
  }
}
