import React from 'react';
import { AppState } from './appstate/appState';
import axios from 'axios';
import { constants } from './constants';
import { MainComponent } from './MainComponent/MainComponent';
import {executor } from './functions/executor';

const appState = AppState;


appInitWorkFlow();


function App() {

  console.log("Render Called");
  return(
    <MainComponent></MainComponent>
    );
}

export default App;


function appInitWorkFlow () {

  axios.get(constants.devServer+"/workFlows/appInit.json").then((result)=>{
        const workFlow = result.data;
        executor(workFlow,appState);
      }).catch((err)=>{
        console.log(err);
  });
}