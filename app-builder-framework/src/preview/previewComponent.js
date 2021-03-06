import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { v4 } from 'uuid';
import { AppState } from '../appstate/appState';
import { createClassFromConfigurations } from '../utilities/classCreatorUtility';
import { constants } from '../constants';
import { executor } from '../functions/executor';
import { BaseComponent } from '../base-components/base-component';






export const PreviewComponent = (props) => {
    console.log(AppState);
    const [elementArray,setElementArray] = useState([]);
    const [renderString,triggerRender] = useState(v4());
    // makeProduction(true);
    
    useEffect(()=>{
      
      axios.get(constants.devServer+"/getDesign/"+props.match.params.appName).then((result)=>{  
      console.log(result.data);
      setElementArray(result.data.map((value)=>{
          return createClassFromConfigurations(value);
        })); 
      });
      
      return () =>{
          console.log("UnMount");
          // makeProduction(false);
        }
    },[]);
    


    const elements = elementArray.map((element)=>{
        let DOMElement = element.getNewClass();
        element.setTriggerRender(triggerRender);    
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



