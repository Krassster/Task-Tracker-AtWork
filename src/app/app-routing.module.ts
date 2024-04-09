import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { TasksPageComponent } from './components/tasks-page/tasks-page.component';

const routes: Routes = [
  { path: '', component: TasksPageComponent },
  { path: 'task/add', component: AddTaskComponent },
  { path: ':id', component: EditTaskComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
