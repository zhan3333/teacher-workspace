import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ConfirmDialogData {
  title?: string;
  confirmMessage?: string;
}

@Component({
  selector: 'workspace-confirm-dialog',
  template: ` <h1 mat-dialog-title>{{ '警告⚠️' }}</h1>
    <div mat-dialog-content>
      <p>{{ '是否确认这么做' }}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">{{ '取消' }}</button>
      <button mat-button [mat-dialog-close]="true" color="primary">
        {{ '确定' }}
      </button>
    </div>`
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
