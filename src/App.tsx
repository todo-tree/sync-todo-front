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

  return (
    <div className="App">
      {tasks
        ? tasks.map((val, index) => {
            return <li key={index}>{val.title}</li>;
          })
        : null}
    </div>
  );
}

export default App;
