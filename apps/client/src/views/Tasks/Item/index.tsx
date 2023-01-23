import { Checkbox } from "@/components";
import { updateTaskMutation } from "@/gql/task";
import { useMutation } from "@/hooks";
import { TaskStatus } from "@/types/task";

import { UpdateVariables, Response } from "../types";
import { Props } from "./types";

function Item(props: Props) {
  const { task, username, onChangeTask } = props;

  const { mutate: updateTask, loading } = useMutation<
    Response<"updateTask">,
    UpdateVariables
  >({
    query: updateTaskMutation,
  });

  const handleOnChangeTask = async (status: boolean) => {
    const response = await updateTask({
      username,
      message: task.message,
      uuid: task.uuid,
      status: status ? TaskStatus.RESOLVED : TaskStatus.PENDING,
    });

    onChangeTask(response.updateTask);
  };

  return (
    <Checkbox
      checked={task.status === TaskStatus.RESOLVED}
      onChange={handleOnChangeTask}
      label={task.message}
      loading={loading}
    />
  );
}

export default Item;
