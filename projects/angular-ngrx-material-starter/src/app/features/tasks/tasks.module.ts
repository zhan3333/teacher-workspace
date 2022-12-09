import { NgModule } from '@angular/core';
import { TaskStatusComponent } from './task-status/task-status.component';
import { TasksComponent } from './tasks.component';
import { SharedModule } from '../../shared/shared.module';
import { TasksRoutingModule } from './tasks-routing.module';

@NgModule({
  declarations: [TaskStatusComponent, TasksComponent],
  imports: [SharedModule, TasksRoutingModule]
})
export class TasksModule {}
