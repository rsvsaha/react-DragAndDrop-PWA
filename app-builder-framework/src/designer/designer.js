import React, { useState, useEffect } from 'react';
import {v4} from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { disselectionAction } from '../appstate/appStateAndReducer';
import { PropertiesWidget } from './propertieswidget';
import { ComponentsWidget } from './componentswidget';
import axios from 'axios';
import { constants } from '../constants';

const id = v4();
                  
export const Designer = (props) => {
    const [renderString,triggerRender] = useState(v4());
    const selectedId = useSelector(state => state.appStateReducer.selectedId)
    const dispatch = useDispatch();

    useEffect(()=>{
      triggerRender(v4());
    },[props.data]);
    
    console.log(selectedId);

    
    
    const pendingState = props.pendingStates.pop();
    console.log(pendingState);
    
    const elementArray = props.data.map((element)=>{
      console.log(element);
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
          <div style={{position:'absolute',top:"600px",left:"0px", width:"1024px",minHeight:"50px",
          border:"2px solid black",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"row",
          flex:"3"}}>
              <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"row",
          flex:"1"}}>
              <button onClick={(event)=>{
                    axios.post(constants.devServer+"/saveDesign/"+props.appName,props.data).then((response)=>{
                      
                    console.log(response.data);
                    // props.history.push("/preview/"+id);
                    window.open("/preview/"+props.appName,"_blank");
                  }).catch((err)=>{console.log(err);})                
                    

                
                }}>PREVIEW</button>
              </div>
              <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"row",
          flex:"1"}}>
              <button onClick={(event)=>{
                
                
                window.open("/logic/"+props.appName,"_blank");
                              
            }}>LOGIC</button>
              </div>
              <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"row",
          flex:"1"}}>
              <button onClick={(event)=>{
                
                
                axios.post(constants.devServer+"/saveDesign/"+props.appName,props.data).then((response)=>{
                  
                console.log(response.data);
              }).catch((err)=>{console.log(err);})                
                

            
            }}>SAVE</button>
              </div>
            
          </div>
          <ComponentsWidget {...props} data={props.data} triggerRender={triggerRender}></ComponentsWidget>
          


          
          <PropertiesWidget deleteState={props.deleteState} triggerRender={triggerRender} saveState={props.saveState} element={props.data.filter((element)=>{
              return (element.id === selectedId) ? true : false;
          })[0]}></PropertiesWidget>
          
        </div>
    
            
      );
}


