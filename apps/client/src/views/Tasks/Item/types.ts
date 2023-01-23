import { Task } from "@/types/task";

export interface Props {
  task: Task;
  username: string;
  onChangeTask: (task: Task) => void;
}
