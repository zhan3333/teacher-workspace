import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TasksComponent } from './tasks.component';
import { TaskStatusComponent } from './task-status/task-status.component';

const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
    data: { title: 'workspace.menu.tasks' }
  },

  {
    path: 'status/:task_id',
    component: TaskStatusComponent,
    data: { title: 'workspace.menu.tasks-status' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {}
