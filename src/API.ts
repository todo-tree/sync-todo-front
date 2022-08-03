import axios from "axios";
import { Task } from "./App";

export const get_task = () => {
  return axios.post("http://localhost:3000", {
    command: { type: "get_task" },
  });
};

export const create_task = (title: string) => {
  if (!(title === "")) {
    axios.post("http://localhost:3000", {
      command: { type: "create_task", data: { title: title } },
    });
  }
};

export const completed_task = (id: string) => {
  axios.post("http://localhost:3000", {
    command: { type: "completed_task", data: { id: id } },
  });
};

export const deleted_task = (id: string) => {
  axios.post("http://localhost:3000", {
    command: { type: "delete_task", data: { id: id } },
  });
};

export const update_task = (title: string, id: string) => {
  if (!(title === "")) {
    axios.post("http://localhost:3000", {
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
  preTasks.forEach((val, index) => {
    if (val._id === updatedTask._id) {
      prePreTasks[index] = updatedTask;
    }
  });
  return prePreTasks;
};

export const socket_delete_task = (
  preTasks: Task[],
  deletedTaskId: string
): Task[] => {
  let prePreTasks = preTasks.slice(0, preTasks.length);
  preTasks.forEach((val, index) => {
    if (val._id === deletedTaskId) {
      prePreTasks.splice(index, 1);
    }
  });
  return prePreTasks;
};
