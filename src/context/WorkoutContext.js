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


