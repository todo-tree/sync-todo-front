import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import TaskItem from "./TaskItem";
import EditModal from "./Modal";

export interface Task {
  _id: string;
  title: string;
  completed: boolean;
  __v: any;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [data, setData] = useState("");
  const [editingId, setEditingID] = useState<string | null>(null);

  const socketRef = useRef<any>();

  useEffect(() => {
    socketRef.current = io(`localhost:3000`);

    socketRef.current.on("create_task", (createdTask: Task) => {
      setTasks((preTasks) => [...preTasks, createdTask]);
    });

    socketRef.current.on("updated_task", (updatedTask: Task) => {
      setTasks((preTasks) => {
        let prePreTasks = preTasks.slice(0, preTasks.length);
        preTasks.map((val, index) => {
          if (val._id === updatedTask._id) {
            prePreTasks[index] = updatedTask;
          }
        });
        return prePreTasks;
      });
    });

    socketRef.current.on("delete_task", (deletedTaskId: string) => {
      setTasks((preTasks) => {
        let prePreTasks = preTasks.slice(0, preTasks.length);
        preTasks.map((val, index) => {
          if (val._id === deletedTaskId) {
            prePreTasks.splice(index, 1);
          }
        });
        return prePreTasks;
      });
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:3000", {
        command: { type: "get_task" },
      })
      .then((res) => {
        if (res.data.ok) {
          setTasks(res.data.tasks);
        }
      });
  }, []);

  const create_task = (title: string) => {
    if (!(data === "")) {
      axios.post("http://localhost:3000", {
        command: { type: "create_task", data: { title: title } },
      });
      setData("");
    }
  };

  const completed_task = (id: string) => {
    axios.post("http://localhost:3000", {
      command: { type: "completed_task", data: { id: id } },
    });
  };

  const deleted_task = (id: string) => {
    axios.post("http://localhost:3000", {
      command: { type: "delete_task", data: { id: id } },
    });
  };

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
          }
        }}
      />
      <button onClick={() => create_task(data)}>Create</button>

      <ul style={{ listStyle: "none" }}>
        {tasks
          ? tasks.map((val, index) => {
              return (
                <TaskItem
                  completed_task={() => {
                    completed_task(val._id);
                  }}
                  deleted_task={() => {
                    deleted_task(val._id);
                  }}
                  openModal={() => {
                    setEditingID(val._id);
                  }}
                  task={val}
                  index={index}
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
