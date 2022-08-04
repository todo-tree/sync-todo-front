import { useState } from "react";
import { create_task } from "./API";

const Inputs = () => {
  const [data, setData] = useState("");

  return (
    <div>
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
      <button
        onClick={() => {
          create_task(data);
          setData("");
        }}
      >
        Create
      </button>
    </div>
  );
};

export default Inputs;
