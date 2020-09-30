export const selectionAction = (uuid,resizedState) => {

    return  {
        type:"selection",
        payload:{
            value:uuid,
            state:resizedState
        }
    }


}

export const disselectionAction = () =>{
    return {
        type:"disselection"
    }

}


export const dragResizeAction = (resizedState) => {
    return {
        type: "drag-resizeEvent",
        payload:resizedState
    }
}

const initialState = {
    selectedId:null,
    stateObject:null    
}


export const appStateReducer = (state=initialState,action) => {
    switch(action.type) {
        
        case "selection":
            return {...state,selectedId:action.payload.value,stateObject:action.payload.state};
        case "disselection":
            return {...state,selectedId:null,stateObject:null};
        case "drag-resizeEvent": {
            return {...state,stateObject:action.payload}
        }
        
        default:
            return state;
    }


}