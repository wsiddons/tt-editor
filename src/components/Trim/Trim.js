import React from "react";
import { UseCtx } from "../../contexts/Context";

function Trim() {
  const { startTime, setStartTime, endTime, setEndTime } = UseCtx();

  const trimStyle = {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: '#1a1a1a',
    width: "30%",
    margin: "3vh",
  };

  return (
    <div style={trimStyle}>
      <div>
        <p style={{ color: "#fff" }}>Clip Start (seconds)</p>
        <input onChange={(e) => setStartTime(e.target.value)} type="text" />
      </div>
      <div>
        <p style={{ color: "#fff" }}>Clip End (seconds)</p>
        <input onChange={(e) => setEndTime(e.target.value)} type="text" />
      </div>
    </div>
  );
}

export default Trim;
