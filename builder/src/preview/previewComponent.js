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
    const [showBack,setShowBack] = useState(false);
    // makeProduction(true);
    
    useEffect(()=>{
      
      axios.get("http://localhost:8085/getDesign/"+props.match.params.id).then((result)=>{  
      console.log(result.data);
      setElementArray(result.data.map((value)=>{
          return createClass(value);
        })); 
      });
    
      return () =>{
          console.log("UnMount");
          // makeProduction(false);
        }
    },[]);
    


    const elements = elementArray.map((element)=>{
        let DOMElement = element.getNewClass();
        
          
          return <DOMElement id={element.id}
          key={element.id} isSelected={false} ></DOMElement>
        
      });
      console.log("Preview Rendering");
    return (<>
    <div onKeyPress={(ev)=>{console.log(ev.key);}}>
    <div style={{position:'absolute',top:"0px",left:"0px", width:"100%",height:"100%", backgroundColor:"#f0f0f0",
    border:"2px solid black" }}>

      {elements}

    </div>

    {/* <div style={{visibility:"visible",position:'absolute',top:"vh",left:"0px",width:"100%", backgroundColor:"transparent",
    border:"2px solid black",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <button onClick={(ev)=>{props.history.goBack();}}>GO BACK</button>
    </div> */}
    
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
    
    const windowHeight =  window.innerHeight;
    const windowWidth = window.innerWidth;
    
    const XRatio = (windowWidth/1024);
    const YRatio = (windowHeight/576);
    
    const width = XRatio *classObj.width;
    const height = YRatio*classObj.height;

    const X =  XRatio * classObj.X;
    const Y =  YRatio * classObj.Y;

    comp.setProduction(true);
    comp.setDimensions(X,Y,width,height);
    comp.events=classObj.events;
    comp.inputVariable=classObj.inputVariable;
    comp.properties=classObj.properties;
    comp.id = classObj.id;
    return comp;

}