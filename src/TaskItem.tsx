import { Task } from "./App";
import { MouseEventHandler } from "react";

interface TaskItemProps {
  index: number;
  task: Task;
  completed_task: MouseEventHandler<HTMLSpanElement>;
}

const TaskItem = (props: TaskItemProps) => {
  const { index, task, completed_task } = props;

  return (
    <li key={index}>
      <span
        onClick={completed_task}
        style={{
          cursor: "pointer",
        }}
      >
        {task && task.completed ? "👌" : "👋"}{" "}
      </span>
      <span
        style={
          task.completed
            ? {
                textDecoration: "line-through",
              }
            : {}
        }
      >
        {task.title}
      </span>
    </li>
  );
};

export default TaskItem;