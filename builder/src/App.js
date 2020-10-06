import React, { useState } from 'react';
import {DesignContainer} from './appstate/appStateHOC';
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import {rootReducer} from './appstate/rootReducer';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { AppState } from './appstate/appState';
import axios from 'axios';
import { DragDropLogicDesigner } from './logicbuilder/logicdesigner/dragDropDesigner';
import { HomeComponent } from './home/homeComponent';
import { constants } from './constants';
import { PreviewStateComponent } from './preview/privewStateComponent';

const store = createStore(rootReducer);
const appState = AppState;

export var appName = window.sessionStorage.getItem('app-name'); 

axios.interceptors.request.use(req => {
  // Important: request interceptors **must** return the request.
  if(req.method === 'get' && req.url.includes("/workFlows/")){
    let url = req.url.split("/");
    let appName = window.sessionStorage.getItem('app-name');
    req.url = constants.devServer+"/apps/"+appName+"/workFlows/"+url[url.length -1 ];
  }
  // console.log(`${req.method} ${req.url}`);
  
  return req;
});



function App() {
  

  console.log("Render Called");
  return(
  <Provider store={store}>
    <BrowserRouter>
    <Switch>    
                <Route path="/home" component = {HomeComponent} exact></Route>
                <Route path="/design/:appName" component={DesignContainer} exact></Route>
                <Route path="/logic/:appName" component={DragDropLogicDesigner} exact></Route>
                <Route path="/preview/:appName" component={PreviewStateComponent} exact></Route>
                <Route path="/" exact>
                  <Redirect to="/home"></Redirect>
                </Route>
    </Switch>
    </BrowserRouter>
  </Provider>
  );
}

export default App;


