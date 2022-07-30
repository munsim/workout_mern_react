import React, { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import formatDistanceStrict from "date-fns/formatDistanceStrict";
const WorkoutDetails = ({ workout }: any) => {
  const [error, seterror] = useState(null);
  const { dispatch } = useWorkoutsContext();
  const deletewkt = async (e: any, wkt: any) => {
    e.preventDefault();
    const response = await fetch(
      `https://workoutmernteact.herokuapp.com/api/workouts/${wkt}`,
      {
        method: "DELETE",
      }
    );

    const json = await response.json();
    console.log(json);
    console.log(response);
    if (!response.ok) {
      seterror(json.error);
    }
    if (response.ok) {
      console.log("Workout deleted");
      dispatch({ type: "delete_wrkt", payload: json });
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg):</strong> {workout.load}
      </p>
      <p>
        <strong>Reps:</strong> {workout.reps}
      </p>
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
