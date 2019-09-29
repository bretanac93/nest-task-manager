export enum TaskStatus {
  Open,
  InProgress,
  Done,
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
