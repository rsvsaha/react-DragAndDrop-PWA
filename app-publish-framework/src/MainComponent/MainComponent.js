import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { v4 } from 'uuid';
import { createClassFromConfigurations } from '../utilities/classCreatorUtility';
import { constants } from '../constants';
import { previewTriggerRender } from '../appstate/appState';

var triggerRenderMain = previewTriggerRender;



export const MainComponent = (props) => {
    const [elementArray,setElementArray] = useState([]);
    const [renderString,triggerRender] = useState(v4());
    
    useEffect(()=>{
      
      axios.get(constants.devServer+"/designs/AppDesign.json").then((result)=>{  
      console.log(result.data);
      setElementArray(result.data.map((value)=>{
          return createClassFromConfigurations(value);
        })); 
      });
      triggerRenderMain = triggerRender;
    
      return () =>{
          console.log("UnMount");
          // makeProduction(false);
          triggerRenderMain = (randomString) => {};
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



