import { Task, TaskStatus } from "@/types/task";

export type Response<T extends string, R = Task> = Record<T, R>;

export interface UsernameVariable {
  username: string;
}

export interface CreateVariables extends UsernameVariable {
  message: string;
}

export interface UpdateVariables extends CreateVariables {
  uuid: string;
  status: TaskStatus;
}
