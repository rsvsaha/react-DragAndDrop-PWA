import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { v4 } from 'uuid';
import { AppState } from '../appstate/appState';
import { createClassFromConfigurations } from '../utilities/classCreatorUtility';
import { constants } from '../constants';
import { executor } from '../functions/executor';


export var previewTriggerRender = (randomString) => {};




export const PreviewComponent = (props) => {
    console.log(AppState);
    const [elementArray,setElementArray] = useState([]);
    const [showBack,setShowBack] = useState(false);
    const [renderString,triggerRender] = useState(v4());
    // makeProduction(true);
    
    useEffect(()=>{
      
      axios.get(constants.devServer+"/getDesign/"+props.match.params.appName).then((result)=>{  
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
      
    return (<>
    <div>
    <div style={{position:'absolute',top:"0px",left:"0px", width:"100%",height:"100%", backgroundColor:"#f0f0f0",
    border:"2px solid black" }}>

      {elements}

    </div>

    
    </div>
    </>);

}



