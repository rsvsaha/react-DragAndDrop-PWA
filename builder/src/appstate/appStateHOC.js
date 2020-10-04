import React from 'react';
var appStateData = [];
var pendingStates = [];

export const AppStateHOC = (WrappedComponent) => {


    return (props) => {
        
        const createAppConfig = () => {
            console.log(appStateData);

        }

        const addState = (state) => {
            appStateData.push(state);
        }


        const savePendingStates = (state) => {
            pendingStates.unshift(state);
        };

        const deleteState = (id) => {
            console.log(appStateData);
            console.log(pendingStates);
            console.log(id);
            let toDeleteIndex = null;
            for(let i=0;i<appStateData.length;i++){
                if(appStateData[i].id === id){
                    toDeleteIndex= id;
                    break;
                }
            }
            if(toDeleteIndex !== null) {
                appStateData.splice(toDeleteIndex,1);
            }

            console.log(appStateData);
        }

        console.log("Called");
        return (
            <WrappedComponent addState={addState} deleteState={deleteState} {...props} createAppConfig={createAppConfig} pendingStates={pendingStates} data={appStateData} saveState={savePendingStates}></WrappedComponent>
        )
    } 






} 