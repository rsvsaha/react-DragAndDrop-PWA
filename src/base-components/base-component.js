import React,{useState, useEffect} from 'react';
import {MoveableComponent} from '../base-components/movable-component';
import { saveState } from '../appstate/componentInfo';



export class  BaseComponent {

   
    X;
    Y;
    width;
    height;
    type="";
    constructor(type) {
        this.type = type;
        this.width = 100;
        this.height = 100;
        this.X = 100;
        this.Y = 100;
    
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
        console.log(X,Y,W,H);
        this.X = X;
        this.Y = Y;
        this.width = W;
        this.height = H;
    }
    
    properties = {};

    getProperties() {
        return this.properties;
    }
    
    getDetails () {
        return {X:this.X,Y:this.Y,Width:this.width,Height:this.height,Type:this.type};
    }





    render (component) {
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
            console.log("Base Component Render",width,height);
        
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

