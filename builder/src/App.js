import React from 'react';
import {AppStateHOC} from './appstate/appStateHOC';
import { Designer } from './designer/designer';
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import {rootReducer} from './appstate/rootReducer';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { LogicDesigner } from './logicbuilder/logicdesigner/logicdesigner';
import { PreviewComponent } from './preview/previewComponent';
import { AppState } from './appstate/appState';
import axios from 'axios';

const store = createStore(rootReducer);
const appState = AppState;
appInitWorkFlow();


function App() {

  const FullComponent = AppStateHOC(Designer);
  const FullPreviewComponent = AppStateHOC(PreviewComponent);
  console.log("Render Called");
  return(
  <Provider store={store}>
    <BrowserRouter>
    <Switch>    
                <Route path="/design" component={FullComponent} exact></Route>
                <Route path="/logic" component={LogicDesigner} exact></Route>
                <Route path="/preview/:id" component={PreviewComponent} exact></Route>
                <Route path="/" exact>
                  <Redirect to="/design"></Redirect>
                </Route>
    </Switch>
    </BrowserRouter>
  </Provider>
  );
}

export default App;


function appInitWorkFlow () {

  axios.get("http://localhost:8085/getWorkflow/appInit.json").then((result)=>{
        const workFlow = result.data;
        const executor = require('./functions/executor');
        executor(workFlow,appState);
      }).catch((err)=>{
        console.log(err);
  });
}