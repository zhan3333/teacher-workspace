import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Task } from '../../model/task.model';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../core/animations/route.animations';
import { NotificationService } from '../../core/notifications/notification.service';
import { ApiService } from '../../api/api.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm.dialog';

@Component({
  selector: 'workspace-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TasksComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  public tasks: Task[] = [];
  public newTodo = '';
  isAddTodoDisabled = false;

  constructor(
    private notification: NotificationService,
    private api: ApiService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.refreshTasks();
  }

  refreshTasks() {
    this.api.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  onNewTodoChange(event: any) {
    this.newTodo = event.target.value;
  }

  onNewTodoClear() {
    this.newTodo = '';
  }

  // todo 添加任务
  onAddTodo() {
    if (this.newTodo === '') {
      return;
    }
    this.api.addTask(this.newTodo).subscribe(() => {
      this.notification.info('添加任务成功');
      this.newTodo = '';
      this.refreshTasks();
    });
  }

  toTaskStatusPage(taskID: number | undefined) {
    if (taskID === undefined) {
      return;
    }
    this.router.navigate(['/tasks/status', taskID]);
  }

  deleteTask(taskID: number | undefined) {
    if (taskID === undefined) {
      return;
    }
    this.dialog
      .open(ConfirmDialogComponent, {})
      .afterClosed()
      .subscribe((ok) => {
        if (ok) {
          this.api.delTask(taskID).subscribe(() => {
            this.notification.success('删除成功');
            this.refreshTasks();
          });
        }
      });
  }
}
