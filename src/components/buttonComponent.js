import React,{useState, useEffect} from 'react';
import {MoveableComponent} from '../base-components/movable-component';
import {saveState} from '../appstate/componentInfo';

export const ButtonComponent = (props) => {

    const [width,setWidth] = useState(100);
    const [height,setHeight] = useState(200);
    const [X,setX] = useState(100);
    const [Y,setY] = useState(100);

    


  return (
    <MoveableComponent setWidth={setWidth} setHeight={setHeight} setX={setX} setY={setY} 
    height={height} width={width} X={X} Y={Y}
    isSelected={props.isSelected}
    id={props.id}
    type="button"
    >
        <button draggable={props.isSelected} style={{ width:width+"px",height:height+"px"}}>{(props.textValue)? props.textValue : "ButtonText"}</button>
    </MoveableComponent> 
    
    
  );
}


export const ButtonProperties = {

  style : {
      buttonColor : "#3d7edb",
      buttonRadius: "10px",
  }


}