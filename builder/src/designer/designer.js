import React, { useState } from 'react';
import {v4} from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { disselectionAction } from '../appstate/appStateAndReducer';
import { PropertiesWidget } from './propertieswidget';
import { ComponentsWidget } from './componentswidget';

export const Designer = (props) => {
    const [renderString,triggerRender] = useState(v4());
    const selectedId = useSelector(state => state.appStateReducer.selectedId)
    const dispatch = useDispatch();
    
    console.log(selectedId);
    
    const pendingState = props.pendingStates.pop();
    const elementArray = props.data.map((element)=>{
      if(pendingState !==undefined && pendingState.id === element.id) {
        console.log(pendingState);
        element.setDimensions(pendingState.stateObject.X,pendingState.stateObject.Y,pendingState.stateObject.width,pendingState.stateObject.height);
      }
      let DOMElement = element.getNewClass();
      if(element.id === selectedId) {

        return <DOMElement id={element.id}
        key={element.id} isSelected={true} ></DOMElement>
      }
      else {
        return <DOMElement id={element.id}
        key={element.id} isSelected={false} ></DOMElement>
      }
    
    });




    return (

        <div>
          <div style={{position:'absolute',top:"0px",left:"0px", width:"1024px",height:"576px", backgroundColor:"#f0f0f0",
          border:"2px solid black" }} onClick={(event)=>{dispatch(disselectionAction())}}>
      
            {elementArray}
    
          </div>
          <ComponentsWidget data={props.data} triggerRender={triggerRender}></ComponentsWidget>
          <div style={{float:"right"}}>
            <button onClick={(event)=>{props.history.push("/preview")}}>PREVIEW</button>
          </div>
          
          <PropertiesWidget saveState={props.saveState} element={props.data.filter((element)=>{
              return (element.id === selectedId) ? true : false;
          })[0]}></PropertiesWidget>
          
        </div>
    
            
      );
}


