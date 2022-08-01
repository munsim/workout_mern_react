import React, { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import { url } from "../pages/Home";

const WorkoutDetails = ({ workout }: any) => {
  const [error, seterror] = useState(null);
  const { dispatch } = useWorkoutsContext();

  const deletewkt = async (e: any, wkt: any) => {
    e.preventDefault();
    const response = await fetch(`${url}/api/workouts/${wkt}`, {
      method: "DELETE",
    });

    const json = await response.json();

    if (!response.ok) {
      seterror(json.error);
    }
    if (response.ok) {
      console.log("Workout deleted");
      dispatch({ type: "delete_wrkt", payload: json });
    }
  };

  const amendtitle = async (e: any, wkt: any) => {
    e.preventDefault();
    const newTitle = prompt("Enter new text:");
    if (newTitle?.length === 0) {
      alert("Can't be blank");
      return;
    } else if (newTitle === null) {
      return; //break out of the function early
    } else {
      const response = await fetch(`${url}/api/workouts/${wkt}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTitle }),
      });
      const json = await response.json();

      if (!response.ok) {
        seterror(json.error);
      }
      if (response.ok) {
        dispatch({ type: "update_wrkt_title", payload: json });
      }
    }
  };

  const amendload = async (e: any, wkt: any) => {
    e.preventDefault();
    const newLoad = prompt("Enter new load:");
    if (newLoad?.length === 0) {
      alert("Can't be blank");
      return;
    } else if (newLoad === null) {
      return; //break out of the function early
    } else if (!/^\d+$/.test(newLoad)) {
      alert("Input has to be a number");
      return; //break out of the function early
    } else {
      const response = await fetch(`${url}/api/workouts/${wkt}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ load: newLoad }),
      });
      const json = await response.json();

      if (!response.ok) {
        seterror(json.error);
      }
      if (response.ok) {
        dispatch({ type: "update_wrkt_load", payload: json });
      }
    }
  };

  const amendreps = async (e: any, wkt: any) => {
    e.preventDefault();
    const newReps = prompt("Enter new reps:");
    if (newReps?.length === 0) {
      alert("Can't be blank");
      return;
    } else if (newReps === null) {
      return; //break out of the function early
    } else if (!/^\d+$/.test(newReps)) {
      alert("Input has to be a number");
      return; //break out of the function early
    } else {
      const response = await fetch(`${url}/api/workouts/${wkt}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reps: newReps }),
      });
      const json = await response.json();

      if (!response.ok) {
        seterror(json.error);
      }
      if (response.ok) {
        dispatch({ type: "update_wrkt_reps", payload: json });
      }
    }
  };

  return (
    <div className="workout-details">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <h4>{workout.title}</h4>
        <button className="amend" onClick={(e) => amendtitle(e, workout._id)}>
          Update
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "row", marginTop: "7px" }}>
        <p>
          <strong>Load (kg):</strong> {workout.load}
        </p>
        <button className="amend" onClick={(e) => amendload(e, workout._id)}>
          Update
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "row", marginTop: "7px" }}>
        <p>
          <strong>Reps:</strong> {workout.reps}
        </p>
        <button className="amend" onClick={(e) => amendreps(e, workout._id)}>
          Update
        </button>
      </div>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <button className="delete" onClick={(e) => deletewkt(e, workout._id)}>
        Delete
      </button>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default WorkoutDetails;
