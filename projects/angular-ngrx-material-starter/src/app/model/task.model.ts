export class Task {
  public id?: number;
  public title?: string;
}

export type Status = 'DONE' | 'ACTIVE';

export class TaskStatus {
  public task_id?: number;
  public student_name?: string;
  public status?: Status;
  public group_name?: Status;
}
