import React, { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

import { url } from "../pages/Home";

const Workoutform = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, settitle] = useState("");
  const [load, setload] = useState("");
  const [reps, setreps] = useState("");
  const [error, seterror] = useState(null);

  const handleSub = async (e: any) => {
    e.preventDefault();
    const workout = { title, load, reps };
    const response = await fetch(`${url}/api/workouts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workout),
    });

    const json = await response.json();
    if (!response.ok) {
      seterror(json.error);
    }
    if (response.ok) {
      seterror(null);
      setload("");
      setreps("");
      settitle("");
      console.log("New workout added");
      dispatch({ type: "create_wrkt", payload: json });
    }
  };
  return (
    <form className="create" onSubmit={handleSub}>
      <h3>Add new workout</h3>
      <label>Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => settitle(e.target.value)}
      />
      <label>Sets:</label>
      <input
        type="number"
        value={load}
        onChange={(e) => setload(e.target.value)}
      />
      <label>Reps:</label>
      <input
        type="number"
        value={reps}
        onChange={(e) => setreps(e.target.value)}
      />
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Workoutform;
