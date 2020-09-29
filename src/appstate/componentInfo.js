export var componentState = [];

export const saveState = (componentStateData) => {
        let others  = componentState.filter((val)=>{ return (componentStateData.id !== val.id) ? true: false});
        
        componentState = [...others,componentStateData];

}
