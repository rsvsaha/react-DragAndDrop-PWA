import React from 'react';
import {AppStateHOC} from './appstate/appStateHOC';
import { Designer } from './designer/designer';
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import {rootReducer} from './appstate/rootReducer';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { LogicDesigner } from './logicbuilder/logicdesigner/logicdesigner';
import { PreviewComponent } from './preview/previewComponent';

const store = createStore(rootReducer);

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
                <Route path="/preview" component={FullPreviewComponent} exact></Route>
                <Route path="/" exact>
                  <Redirect to="/design"></Redirect>
                </Route>
    </Switch>
    </BrowserRouter>
  </Provider>
  );
}

export default App;
