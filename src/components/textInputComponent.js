import React,{useState, useEffect} from 'react';
import {MoveableComponent} from '../base-components/movable-component';
import { saveState } from '../appstate/componentInfo';

export const TextInputComponent = (props) => {
    const [width,setWidth] = useState(100);
    const [height,setHeight] = useState(200);
    const [X,setX] = useState(100);
    const [Y,setY] = useState(100);
    
    

    console.log(props.isSelected);
    return (
    <MoveableComponent setWidth={setWidth} setHeight={setHeight} setX={setX} setY={setY} 
    height={height} width={width} X={X} Y={Y}
    isSelected={props.isSelected}
    id = {props.id}
    type="textInput"
    >
        <input type="text" draggable={props.isSelected} style={{ width:width+"px",height:height+"px"}}></input>
    </MoveableComponent> 
  );
}



