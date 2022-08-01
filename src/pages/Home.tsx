import React from "react";
import { useEffect, useState } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import Workoutform from "../components/Workoutform";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
//export const url = "http://localhost:4000";
export const url = "https://workoutmernteact.herokuapp.com";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(`${url}/api/workouts`);
      const newData = await response.json();

      if (response.ok) {
        dispatch({ type: "set_wrkts", payload: newData });
      }
    };
    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout: any) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <Workoutform />
    </div>
  );
};

export default Home;
