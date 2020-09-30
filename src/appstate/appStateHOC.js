import React from 'react';

export const AppStateHOC = (WrappedComponent) => {


    return () => {
        var appStateData = [];
        var pendingStates = [];


        const savePendingStates = (state) => {
            pendingStates.unshift(state);
        };




        return (
            <WrappedComponent pendingStates={pendingStates} data={appStateData} saveState={savePendingStates}></WrappedComponent>
        )
    } 






} 