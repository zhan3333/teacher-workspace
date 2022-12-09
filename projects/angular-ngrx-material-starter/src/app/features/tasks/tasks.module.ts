import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskStatusComponent } from './task-status/task-status.component';
import { TasksComponent } from './tasks.component';
import { SharedModule } from '../../shared/shared.module';
import { TasksRoutingModule } from './tasks-routing.module';

@NgModule({
  declarations: [TaskStatusComponent, TasksComponent],
  imports: [CommonModule, SharedModule, TasksRoutingModule]
})
export class TasksModule {}
