import { Task } from "./interface";
import { MouseEventHandler } from "react";

interface TaskItemProps {
  task: Task;
  completed_task: MouseEventHandler<HTMLSpanElement>;
  deleted_task: MouseEventHandler<HTMLSpanElement>;
  openModal: MouseEventHandler<HTMLSpanElement>;
}

const TaskItem = (props: TaskItemProps) => {
  const { task, completed_task, deleted_task, openModal } = props;

  return (
    <li>
      <span
        style={{ marginRight: 6, cursor: "pointer" }}
        onClick={deleted_task}
      >
        {"🗑️"}
      </span>
      <span style={{ marginRight: 6, cursor: "pointer" }} onClick={openModal}>
        {"🖊️"}
      </span>
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
