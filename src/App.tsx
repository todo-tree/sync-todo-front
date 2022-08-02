import { useState, useEffect } from "react";
import axios from "axios";

interface task {
  _id: String;
  title: String;
  completed: Boolean;
  __v: any;
}

function App() {
  const [tasks, setTasks] = useState<task[]>([]);
  const [data, setData] = useState("");

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
    axios.post("http://localhost:3000", {
      command: { type: "create_task", data: { title: title } },
    });
    setData("");
  };

  return (
    <div className="App">
      <ul>
        <input onChange={(e) => setData(e.target.value)} value={data} />
        <button onClick={() => create_task(data)}>+</button>
      </ul>
      <ul>
        {tasks
          ? tasks.map((val, index) => {
              return <li key={index}>{val.title}</li>;
            })
          : null}
      </ul>
    </div>
  );
}

export default App;
