import React from 'react';
import {AppStateHOC, DesignContainer} from './appstate/appStateHOC';
import { Designer } from './designer/designer';
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import {rootReducer} from './appstate/rootReducer';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { LogicDesigner } from './logicbuilder/logicdesigner/logicdesigner';
import { PreviewComponent } from './preview/previewComponent';
import { AppState } from './appstate/appState';
import axios from 'axios';
import { DragDropLogicDesigner } from './logicbuilder/logicdesigner/dragDropDesigner';
import { HomeComponent } from './home/homeComponent';
import { constants } from './constants';

const store = createStore(rootReducer);
const appState = AppState;


appInitWorkFlow();


function App() {

  console.log("Render Called");
  return(
  <Provider store={store}>
    <BrowserRouter>
    <Switch>    
                <Route path="/home" component = {HomeComponent} exact></Route>
                <Route path="/design/:appName" component={DesignContainer} exact></Route>
                <Route path="/logic" component={DragDropLogicDesigner} exact></Route>
                <Route path="/preview/:id" component={PreviewComponent} exact></Route>
                <Route path="/" exact>
                  <Redirect to="/home"></Redirect>
                </Route>
    </Switch>
    </BrowserRouter>
  </Provider>
  );
}

export default App;


function appInitWorkFlow () {

  axios.get(constants.devServer+"workFlows/appInit.json").then((result)=>{
        const workFlow = result.data;
        const executor = require('./functions/executor');
        executor(workFlow,appState);
      }).catch((err)=>{
        console.log(err);
  });
}