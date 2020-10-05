import React, { useState,useEffect } from 'react';
import {makeProduction} from '../base-components/base-component';
import axios from 'axios';
import { CompositeComponent } from '../components/compositeComponent';
import { TextComponent } from '../components/textComponent';
import { TextInputComponent } from '../components/textInputComponent';
import { ButtonComponent } from '../components/buttonComponent';
import { ImageComponent } from '../components/imageComponent';
import { MessageComponent } from '../components/messageComponent';
import { v4 } from 'uuid';
import { AppState } from '../appstate/appState';
import { createClassFromConfigurations } from '../utilities/classCreatorUtility';

export var previewTriggerRender = (randomString) => {};

export const PreviewComponent = (props) => {
    console.log(AppState);
    const [elementArray,setElementArray] = useState([]);
    const [showBack,setShowBack] = useState(false);
    const [renderString,triggerRender] = useState(v4());
    // makeProduction(true);
    
    useEffect(()=>{
      
      axios.get("http://localhost:8085/getDesign/"+props.match.params.id).then((result)=>{  
      console.log(result.data);
      setElementArray(result.data.map((value)=>{
          return createClassFromConfigurations(value);
        })); 
      });
      previewTriggerRender = triggerRender;
    
      return () =>{
          console.log("UnMount");
          // makeProduction(false);
          previewTriggerRender = (randomString) => {};
        }
    },[]);
    


    const elements = elementArray.map((element)=>{
        let DOMElement = element.getNewClass();
        
          
          return <DOMElement id={element.id}
          key={element.id} isSelected={false} ></DOMElement>
        
      });
      // console.log("Preview Rendering");
    return (<>
    <div>
    <div style={{position:'absolute',top:"0px",left:"0px", width:"100%",height:"100%", backgroundColor:"#f0f0f0",
    border:"2px solid black" }}>

      {elements}

    </div>

    
    </div>
    </>);

}



