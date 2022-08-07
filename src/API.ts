import axios from "axios";
import { Task } from "./interface";
import development from "./config";

const URLJoin = (...args: string[]) =>
  args
    .join("/")
    .replace(/[/]+/g, "/")
    .replace(/^(.+):\//, "$1://")
    .replace(/^file:/, "file:/")
    .replace(/\/(\?|&|#[^!])/g, "$1")
    .replace(/\?/g, "&")
    .replace("&", "?");

export const get_task = () => {
  return axios.get(URLJoin(development.api_url, "task"));
};

export const create_task = (title: string) => {
  if (!(title.trim() === "")) {
    axios.post(URLJoin(development.api_url, "task"), {
      data: { title: title },
    });
  }
};

export const completed_task = (id: string) => {
  axios.post(URLJoin(development.api_url, "task", id));
};

export const deleted_task = (id: string) => {
  axios.delete(URLJoin(development.api_url, "task", id));
};

export const update_task = (title: string, id: string) => {
  if (!(title.trim() === "")) {
    axios.patch(URLJoin(development.api_url, "task", id), {
      data: { title: title },
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
