import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";

interface task {
  _id: string;
  title: string;
  completed: boolean;
  __v: any;
}

function App() {
  const [tasks, setTasks] = useState<task[]>([]);
  const [data, setData] = useState("");

  const socketRef = useRef<any>();

  useEffect(() => {
    socketRef.current = io(`localhost:3000`);

    socketRef.current.on("create_task", (createdTask: task) => {
      setTasks((preTasks) => [...preTasks, createdTask]);
    });

    socketRef.current.on("completed_task", (updatedTask: task) => {
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

      <ul style={{ listStyle: "none" }}>
        {tasks
          ? tasks.map((val, index) => {
              return (
                <li key={index}>
                  <span
                    onClick={() => {
                      completed_task(val._id);
                    }}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {val && val.completed ? "👌" : "👋"}{" "}
                  </span>
                  <span
                    style={
                      val.completed
                        ? {
                            textDecoration: "line-through",
                          }
                        : {}
                    }
                  >
                    {val.title}
                  </span>
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
}

export default App;
