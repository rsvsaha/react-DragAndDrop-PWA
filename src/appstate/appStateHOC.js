import React from 'react';

export const AppStateHOC = (WrappedComponent) => {


    return () => {
        var appStateData = [];
        var selected = "";

        return (
            <WrappedComponent data={appStateData} selected={selected}></WrappedComponent>
        )
    } 






} 