const task = `
  username
  uuid
  message
  status
  created_at
  updated_at
  additionalData
`;

// Mutations
export const createTaskMutation = `
  mutation CreateTask($username: String!, $message: String!) {
    createTask(username: $username, message: $message) {
      ${task}
    }
  }
`;

export const updateTaskMutation = `
  mutation UpdateTask(
    $username: String!,
    $uuid: String!,
    $message: String!,
    $status: Status!
  ) {
    updateTask(username: $username, uuid: $uuid, message: $message, status: $status) {
      ${task}
    }
  }
`;

// Query
export const tasksByUserQuery = `
  query TasksByUser ($username: String!) {
    tasksByUser(username: $username) {
      ${task}
    }
  }
`;

// Subscriptions
export const createdOrUpdatedTaskSubscription = `
  subscription CreatedOrUpdatedTask($username: String) {
    createOrUpdateTask(username: $username) {
      ${task}
    }
  }
`;
