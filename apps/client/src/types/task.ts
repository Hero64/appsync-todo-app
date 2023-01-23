export enum TaskStatus {
  PENDING = "PENDING",
  RESOLVED = "RESOLVED",
}

export interface Task {
  message: string;
  status: TaskStatus;
  uuid: string;
}
