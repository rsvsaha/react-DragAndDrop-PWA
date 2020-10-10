import React,{useState, useEffect} from 'react';
import {MoveableComponent} from '../base-components/movable-component';




export class  BaseComponent {

   
    X;
    Y;
    width;
    height;
    type="";
    production = false;
    constructor(type) {
        this.type = type;
        this.width = 100;
        this.height = 100;
        this.X = 100;
        this.Y = 100;
    
    }
    triggerFunction = (val) => {};
    triggerRender = (val) => {
        console.log(val);
        this.triggerFunction(val);
    }

    setTriggerRender = (val) => {
        this.triggerFunction = val;
    }
    setProduction = (val) => {
        this.production = val;
    }

    setX = (X) => {
        this.X = X;
    }

    setY = (Y) => {
        this.Y = Y;
    }

    setWidth = (width) => {
        this.width = width;
    }

    setHeight = (height) => {
        this.height = height;
    }


    setDimensions = (X,Y,W,H) => {
        // console.log(X,Y,W,H);
        this.X = X;
        this.Y = Y;
        this.width = W;
        this.height = H;
    }
    
    properties = {};

    getProperties() {
        return this.properties;
    }

    events = {}
    
    setEventWorkflowName = (eventName,workFlowName) => {
        this.events[eventName].workFlowName = workFlowName;
    }



    inputVariable = {}
    
    setInputVariable = (fieldName,value) => {
    this.inputVariable[fieldName].value = value;
    }

    getDetails () {
        return {X:this.X,Y:this.Y,Width:this.width,Height:this.height,Type:this.type};
    }





    render (component) {
        if(this.production){
            return (props) => {
                return (<>{component(false,{position:"absolute", left:this.X,top:this.Y,width:this.width+"px",height:this.height+"px"})}</>)
            }
        }
        
        
        return (props) => {
            const [width,setWidth] = useState(this.width);
            const [height,setHeight] = useState(this.height);
            const [X,setX] = useState(this.X);
            const [Y,setY] = useState(this.Y);
            
            useEffect(()=>{
                this.setX(X);
                this.setY(Y);
                this.setWidth(width);
                this.setHeight(height);

            });
            // console.log("Base Component Render",width,height);
        
            return (
                <MoveableComponent setWidth={setWidth} setHeight={setHeight} setX={setX} setY={setY} 
                height={height} width={width} X={X} Y={Y}
                isSelected={props.isSelected}
                id = {props.id}
                type={this.type}
                >   
                 {component(props.isSelected,{ width:width+"px",height:height+"px"})}
                
                </MoveableComponent>
            );    
        }     
    }
}

