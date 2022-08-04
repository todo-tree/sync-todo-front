import axios from "axios";
import { Task } from "./interface";
import development from "./config";

export const get_task = () => {
  return axios.post(development.api_url, {
    command: { type: "get_task" },
  });
};

export const create_task = (title: string) => {
  if (!(title.trim() === "")) {
    axios.post(development.api_url, {
      command: { type: "create_task", data: { title: title } },
    });
  }
};

export const completed_task = (id: string) => {
  axios.post(development.api_url, {
    command: { type: "completed_task", data: { id: id } },
  });
};

export const deleted_task = (id: string) => {
  axios.post(development.api_url, {
    command: { type: "delete_task", data: { id: id } },
  });
};

export const update_task = (title: string, id: string) => {
  if (!(title.trim() === "")) {
    axios.post(development.api_url, {
      command: { type: "update_task", data: { title: title, id: id } },
    });
  }
};

export const socket_create_task = (
  preTasks: Task[],
  createdTask: Task
): Task[] => {
  return [...preTasks, createdTask];
};

export const socket_update_task = (
  preTasks: Task[],
  updatedTask: Task
): Task[] => {
  let prePreTasks = preTasks.slice(0, preTasks.length);
  prePreTasks[preTasks.findIndex((e) => e._id === updatedTask._id)] =
    updatedTask;
  return prePreTasks;
};

export const socket_delete_task = (
  preTasks: Task[],
  deletedTaskId: string
): Task[] => {
  let prePreTasks = preTasks.slice(0, preTasks.length);
  prePreTasks.splice(
    preTasks.findIndex((e) => e._id === deletedTaskId),
    1
  );
  return prePreTasks;
};
