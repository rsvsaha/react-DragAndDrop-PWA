import React from 'react';
var appStateData = [];
var pendingStates = [];

export const AppStateHOC = (WrappedComponent) => {


    return (props) => {
        
        const createAppConfig = () => {
            console.log(appStateData);

        }


        const savePendingStates = (state) => {
            pendingStates.unshift(state);
        };




        return (
            <WrappedComponent {...props} createAppConfig={createAppConfig} pendingStates={pendingStates} data={appStateData} saveState={savePendingStates}></WrappedComponent>
        )
    } 






} 