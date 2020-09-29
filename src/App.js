import React from 'react';
import {AppStateHOC} from './appstate/appStateHOC';
import { Designer } from './designer/designer';
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import {rootReducer} from './appstate/rootReducer';

const store = createStore(rootReducer);

function App() {
  
  const FullComponent = AppStateHOC(Designer)
  console.log("Render Called");
  return(
  <Provider store={store}>
    <FullComponent></FullComponent>
  </Provider>
  );
}

export default App;
