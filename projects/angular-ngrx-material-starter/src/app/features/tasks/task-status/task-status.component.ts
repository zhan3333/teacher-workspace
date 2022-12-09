import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ApiService } from '../../../api/api.service';
import { Task, TaskStatus } from '../../../model/task.model';
import { MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'workspace-task-status',
  templateUrl: './task-status.component.html',
  styleUrls: ['./task-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TaskStatusComponent implements OnInit {
  @ViewChild(MatSelectionList) list: MatSelectionList | undefined;
  public taskStatus: TaskStatus[] = [];
  public task: Task | undefined;
  task_id = 0;

  constructor(
    private activated: ActivatedRoute,
    private notification: NotificationService,
    private api: ApiService
  ) {
    this.task_id = parseInt(
      activated.snapshot.paramMap.get('task_id') || '',
      10
    );
    if (this.task_id === 0) {
      this.notification.error('invalid params');
      return;
    }
    console.log('task_id=' + this.task_id);
  }

  ngOnInit(): void {
    if (this.list !== undefined) {
      this.list.selectionChange.subscribe((data) =>
        console.log('change', data)
      );
    }
    this.api
      .getTaskStatus(this.task_id)
      .subscribe((data) => (this.taskStatus = data));
    this.api.getTask(this.task_id).subscribe((data) => (this.task = data));
  }

  onStatusChange(students: MatSelectionList, studentName: string | undefined) {
    if (studentName === undefined) {
      return;
    }
    const selected =
      students.selectedOptions.selected.filter((v) => v.value === studentName)
        .length === 1;
    this.api
      .setTaskStatus(this.task_id, studentName, selected ? 'DONE' : 'ACTIVE')
      .subscribe(() => {
        this.notification.success('操作成功');
      });
  }
}
