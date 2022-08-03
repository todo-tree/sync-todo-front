import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import TaskItem from "./TaskItem";
import EditModal from "./Modal";
import {
  create_task,
  completed_task,
  deleted_task,
  socket_delete_task,
  socket_update_task,
  socket_create_task,
  get_task,
} from "./API";
import { Task } from "./interface";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [data, setData] = useState("");
  const [editingId, setEditingID] = useState<string | null>(null);

  const socketRef = useRef<any>();

  useEffect(() => {
    socketRef.current = io(`localhost:3000`);

    socketRef.current.on("create_task", (createdTask: Task) => {
      setTasks((preTasks) => socket_create_task(preTasks, createdTask));
    });

    socketRef.current.on("updated_task", (updatedTask: Task) => {
      setTasks((preTasks) => socket_update_task(preTasks, updatedTask));
    });

    socketRef.current.on("delete_task", (deletedTaskId: string) => {
      setTasks((preTasks) => socket_delete_task(preTasks, deletedTaskId));
    });

    return () => socketRef.current.disconnect();
  }, []);

  useEffect(() => {
    get_task().then((res) => {
      if (res.data.ok) {
        setTasks(res.data.tasks);
      }
    });
  }, []);

  return (
    <div className="App">
      <input
        style={{
          marginTop: 15,
          marginLeft: 40,
        }}
        onChange={(e) => setData(e.target.value)}
        value={data}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            create_task(data);
            setData("");
          }
        }}
      />
      <button onClick={() => create_task(data)}>Create</button>

      <ul style={{ listStyle: "none" }}>
        {tasks
          ? tasks.map((val, index) => {
              return (
                <TaskItem
                  key={index}
                  completed_task={() => completed_task(val._id)}
                  deleted_task={() => deleted_task(val._id)}
                  openModal={() => setEditingID(val._id)}
                  task={val}
                />
              );
            })
          : null}
      </ul>

      <EditModal
        editingId={editingId}
        setEditingID={setEditingID}
        tasks={tasks}
      />
    </div>
  );
}

export default App;
