import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Task, TaskManagementService } from 'src/app/service/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent {
  showValidationErrors: boolean;

  task!: Task;

  activePriority: string | null = null;
  activeStatus: string | null = null;

  projects: string[] = [];
  isNewProject: boolean = false;

  constructor(
    private taskService: TaskManagementService,
    private route: ActivatedRoute,
    private router: Router
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
          this.activeStatus = fetchedTask.status.class;
          this.activePriority = fetchedTask.priority.class;
        } else {
        }
      }
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    if (true) {
      this.taskService.updateTask(this.task.id, this.task);
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

  deleteTask() {
    this.taskService.deleteTask(this.task.id);
  }
}
