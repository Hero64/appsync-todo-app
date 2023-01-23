import { useState } from "react";

import {
  Container,
  EmptyContent,
  Input,
  Checkbox,
  Loading,
} from "@/components";
import { useMutation, useQuery, useSubscription } from "@/hooks";
import {
  createTaskMutation,
  createdOrUpdatedTaskSubscription,
  tasksByUserQuery,
} from "@/gql/task";
import { Task } from "@/types/task";
import { Response, CreateVariables, UsernameVariable } from "./types";
import Item from "./Item";

const USERNAME = "anonymous";

function TasksView() {
  const [text, setText] = useState("");
  const {
    loading: tasksLoading,
    data: tasks = [],
    setData: setTasks,
  } = useQuery<Task[], UsernameVariable>({
    query: tasksByUserQuery,
    index: "tasksByUser",
    callOnMounted: true,
    variables: {
      username: USERNAME,
    },
  });
  const { mutate: createTask, loading: createLoading } = useMutation<
    Response<"createTask">,
    CreateVariables
  >({
    query: createTaskMutation,
  });
  useSubscription<Response<"createOrUpdateTask">, UsernameVariable>({
    query: createdOrUpdatedTaskSubscription,
    subscribeOnMount: true,
    variables: {
      username: USERNAME,
    },
    onMessage: ({ createOrUpdateTask }) => {
      setTasks((currentTasks = []) => {
        const index = currentTasks.findIndex((t) => {
          return t.uuid === createOrUpdateTask.uuid;
        });

        if (index === -1) {
          return [...currentTasks, createOrUpdateTask];
        }

        currentTasks[index] = createOrUpdateTask;

        return [...currentTasks];
      });
    },
  });

  const hasTasks = tasks.length > 0;

  const handleOnAddTask = async () => {
    try {
      const { createTask: newTask } = await createTask({
        message: text,
        username: USERNAME,
      });
      setText("");

      setTasks(() => [...tasks, newTask]);
    } catch {}
  };

  const handleOnChangeTask = (task: Task) => {
    const index = tasks.findIndex((t) => {
      return t.uuid === task.uuid;
    });

    const currentTasks = [...tasks];
    currentTasks[index] = task;

    setTasks(currentTasks);
  };

  return (
    <Container>
      <div className="h-96 overflow-auto mb-6 relative">
        {tasksLoading && (
          <div className="bg-white absolute top-0 left-0 w-full h-full z-10 flex items-center justify-center">
            <Loading show />
          </div>
        )}
        {!hasTasks ? (
          <EmptyContent emoji="😯">
            <>
              Ups!! You have not added tasks to the list. But don't worry, you
              can add one from the text box
              <a
                href="/"
                target="_blank"
                className="block text-center text-sm text-blue-500 pt-6 underline-offset-2"
              >
                Click here to see the result in real time
              </a>
            </>
          </EmptyContent>
        ) : (
          <div>
            <h2 className="text-2xl mb-4 font-bold">Task List</h2>
            {tasks.map((task, index) => (
              <Item
                key={index}
                username={USERNAME}
                task={task}
                onChangeTask={handleOnChangeTask}
              />
            ))}
          </div>
        )}
      </div>
      <Input
        value={text}
        placeholder="Enter new task"
        onChange={setText}
        onEnter={handleOnAddTask}
        loading={createLoading}
      />
    </Container>
  );
}

export default TasksView;
