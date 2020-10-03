import React, { useState,useEffect } from 'react';
import {makeProduction} from '../base-components/base-component';
import axios from 'axios';
import { CompositeComponent } from '../components/compositeComponent';
import { TextComponent } from '../components/textComponent';
import { TextInputComponent } from '../components/textInputComponent';
import { ButtonComponent } from '../components/buttonComponent';
import { ImageComponent } from '../components/imageComponent';


export const PreviewComponent = (props) => {
    // console.log(props);
    const [elementArray,setElementArray] = useState([]);
    makeProduction(true);
    
    useEffect(()=>{
      
      axios.get("http://localhost:8085/getDesign/"+props.match.params.id).then((result)=>{  
      console.log(result.data);
      setElementArray(result.data.map((value)=>{
          return createClass(value);
        })); 
      });
    
      return () =>{
          console.log("UnMount");
          makeProduction(false);
        }
    },[]);
    


    const elements = elementArray.map((element)=>{
        console.log(element);
        let DOMElement = element.getNewClass();
        
          
          return <DOMElement id={element.id}
          key={element.id} isSelected={false} ></DOMElement>
        
      });
      console.log("Preview Rendering");
    return (<>
    <div>
    <div style={{position:'absolute',top:"0px",left:"0px", width:"1024px",height:"576px", backgroundColor:"#f0f0f0",
    border:"2px solid black" }}>

      {elements}

    </div>
    <div style={{position:'absolute',top:"580px",left:"0px", width:"1024px", backgroundColor:"#f0f0f0",
    border:"2px solid black" }}><button onClick={(ev)=>{props.history.goBack();}}>BACK</button></div>
    
    </div>
    </>);

}



const typeToClass = {

    "ButtonComponent" : () => { return new ButtonComponent();},
    "CompositeComponent": () => {return new CompositeComponent();},
    "TextComponent":() => {return new TextComponent();},
    "TextInputComponent":() => {return new TextInputComponent()},
    "ImageComponent":()=>{return new ImageComponent();}
}


const createClass = (classObj) => {
    var comp = typeToClass[classObj.type]();
    comp.setDimensions(classObj.X,classObj.Y,classObj.width,classObj.height);
    comp.events=classObj.events;
    comp.inputVariable=classObj.inputVariable;
    comp.properties=classObj.properties;
    comp.id = classObj.id;
    return comp;

}