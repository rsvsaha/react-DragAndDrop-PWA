export const selectionAction = (uuid) => {

    return  {
        type:"selection",
        payload:{
            value:uuid
        }
    }


}

export const disselectionAction = () =>{

    return {
        type:"disselection"
    }

}

const initialState = {selectedId:""}


export const appStateReducer = (state={initialState},action) => {
    console.log(action);
    switch(action.type) {
        
        case "selection":
            return {selectedId:action.payload.value};
        case "disselection":
            return {selectedId:""};
        default:
            return state;
    }


}