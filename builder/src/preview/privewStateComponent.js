import React, { useState, useEffect } from 'react';
import { PreviewComponent } from './previewComponent';
import { AppState } from '../appstate/appState';
import axios from 'axios';
import { executor } from '../functions/executor';
import { constants } from '../constants';

  

export const PreviewStateComponent = (props) => {

    const [isAppStateInitialed,setAppStateInitialzed] = useState(false);

    useEffect(()=>{
        let url = constants.devServer+"/apps/"+props.match.params.appName+"/workFlows"+"/appInit.json";
        console.log(url);
        axios.get(url).then((result)=>{
            const workFlow = result.data;
            executor(workFlow,AppState);
            setAppStateInitialzed(true);
          }).catch((err)=>{
            console.log(err);
        });
    },[]);
    
    
    return ((isAppStateInitialed) ? <PreviewComponent {...props}></PreviewComponent> : null);
      
            


}