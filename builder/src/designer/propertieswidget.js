import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { dragResizeAction,disselectionAction } from '../appstate/appStateAndReducer';
import { v4 } from 'uuid';





export const PropertiesWidget = (props) => {
    const selectedId = useSelector(state => state.appStateReducer.selectedId);
    const stateObject = useSelector(state => state.appStateReducer.stateObject);
    const dispatch = useDispatch();
    
    var elementPropertyKeys=[];
    var elementPropertyValues=[];
    var elementPropertyStates =[];
    var elementPropFields;
    var X, Y , W, H;
    
    
    

    
    if(selectedId !== null && stateObject !== null) {
        console.log(props.element.properties);
        
        elementPropertyKeys = Object.keys(props.element.properties);
        elementPropertyValues = Object.values(props.element.properties);


        X = stateObject.X;
        Y = stateObject.Y;
        W = stateObject.width;
        H = stateObject.height;

        
        const inputChangeHandlerX = (event) => {
                dispatch(dragResizeAction({...stateObject,X:parseFloat(event.target.value)})); 
        }
        const inputChangeHandlerY = (event) => {
            dispatch(dragResizeAction({...stateObject,Y:parseFloat(event.target.value)})); 
        }
       const inputChangeHandlerW = (event) => {
            dispatch(dragResizeAction({...stateObject,width:parseFloat(event.target.value)})); 
        }
        const inputChangeHandlerH = (event) => {
            dispatch(dragResizeAction({...stateObject,height:parseFloat(event.target.value)})); 
        }

        elementPropFields = (
            <>
            <div>X:<input type="number" id="X" value={X}  onChange={ inputChangeHandlerX}></input> </div>
            <div>Y:<input type="number" id="Y" value={Y} onChange={inputChangeHandlerY}></input></div>
            <div>Width:<input type="number" id="W" value={W} onChange={inputChangeHandlerW}></input></div>
            <div>Height:<input type="number" id="H"  value={H} onChange={inputChangeHandlerH}></input></div>
            </>
        );
       
    }
    
    const createFields = () => {
        return elementPropertyKeys.map((value,index)=>{
            var val = elementPropertyValues[index].value;
            elementPropertyStates.push(val);
            return <div key={v4()}>{value}:<input type={elementPropertyValues[index].type} defaultValue={val} 
                onChange={(event)=>{props.element.setProperty(value,event.target.value);}}
            ></input> </div>
        })
    }
    
    
    console.log("Render called");

    return(
        <div style={{position:'absolute',top:"577px",left:"0px",width:"1224px",height:"160px",
        border:"2px solid black"}}>
              <div>SelectedId:{selectedId}</div>
                {
                    (selectedId !== null) ? elementPropFields : null
                }
                {
                    (selectedId !== null) ? createFields() : null
                }
                <div><button onClick={()=>{console.log("Saved",stateObject);props.saveState({id:selectedId,stateObject:stateObject}); dispatch(disselectionAction());}}>SAVE</button></div>
            
            
        </div>
    
    );
    
}