import React,{useState,useEffect} from 'react';
import {ResizeableComponent} from '../base-components/resizable-component';
import { saveState } from '../appstate/componentInfo';

export const MoveableComponent = (props) => {
    const [height,setHeight] = useState( (props.height) ? props.height : 200);
    const [width,setWidth] = useState((props.width) ? props.width : 200);
    const [X,setX] = useState((props.X) ? props.X : 200);
    const [Y,setY] = useState((props.Y) ? props.Y : 200);
  
    useEffect(()=>{
        saveState(getDetails());
      })
      const getDetails = () => {
        return {X:X,Y:Y,width:width,height:height,id:props.id,type:props.type};
    }
  const handlePositionChangeX = (X) => {
    props.setX(X);  
    setX(X);
  }

  const handlePositionChangeY = (Y) => {
    props.setY(Y) ;
    setY(Y);
  }
  
  
  const handleHeightChanges = (changeHeight) => {
    console.log("Height Changes",changeHeight);
    props.setHeight((previouseHeight)=>{
        return previouseHeight + changeHeight});
    setHeight((previouseHeight)=>{
        return previouseHeight + changeHeight});
  }


const handleWidthChanges = (changeWidth) => {
    console.log("Width Changes",changeWidth);
    props.setWidth((previouseWidth)=> {
        return previouseWidth + changeWidth
    }) ; 
    setWidth((previouseWidth)=>{
        return previouseWidth + changeWidth});
  }

const restrictConstraints = () => {
    if(X < 0) {
        setX(0);  
    };

    if(Y < 0) {
        setY(0);  
    };

    if(X+width+5>1024) {
        setX(1024-width-10);
    }

    if(Y+height+5> 576) {
        setY(576-height-10);
    }

    if(height > 576-10) {
        setHeight(576-10);
    }
    if(width > 1024-10) {
        setWidth(1024-10);
    }

}



 useEffect(()=>{
    
    restrictConstraints();

 },[X,Y,height,width]);
  


 useEffect(()=>{
    restrictConstraints();
 },[]);

 console.log(props.isSelected);
  return (
    <ResizeableComponent width={width} height={height} posX={X} posY={Y}
    handleHeightChanges={handleHeightChanges}
    handleWidthChanges= {handleWidthChanges}
    handleXChanges = {handlePositionChangeX}
    handleYChanges = {handlePositionChangeY}
    isSelected={props.isSelected}
    id = {props.id}
    >   
        {props.children}
    </ResizeableComponent>
  );
}