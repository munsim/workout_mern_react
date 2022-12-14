import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext()
export const workoutsReducer = (state, action)=>{
switch (action.type) {
    case "set_wrkts": 
        return  {
        workouts:action.payload
    }
    case "create_wrkt":
        return {
            workouts:[...state.workouts, action.payload]
        }
    case "delete_wrkt":
        return {
            workouts:state.workouts.filter(wkt=>wkt._id!==action.payload._id)
        }
    case "update_wrkt_title":
        return {
           workouts:state.workouts.map(wkt=> {return wkt._id == action.payload._id ? {...wkt,title: action.payload.title} : wkt})
        }
    case "update_wrkt_load":
        return {
           workouts:state.workouts.map(wkt=>{return wkt._id == action.payload._id ? {...wkt, load:action.payload.load} : wkt})
        }
    case "update_wrkt_reps":
        return {
           workouts:state.workouts.map(wkt=>{return wkt._id == action.payload._id ? {...wkt, reps:action.payload.reps} : wkt})
        }    
    default:
        return state
}
}
export const WorkoutsContextProvider = ({children})=>{
    const [state,dispatch]=useReducer(workoutsReducer,{workouts:null})
    
    return (
        <WorkoutsContext.Provider value={{...state, dispatch}}> 
                {children}
        </WorkoutsContext.Provider>
    )
}


