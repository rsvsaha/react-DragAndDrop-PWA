import React, { useEffect } from 'react';
import {makeProduction} from '../base-components/base-component';



export const PreviewComponent = (props) => {

    console.log(props.data);
    console.log(props);
    
    makeProduction(true);
    
    useEffect(()=>{
        return () =>{
            makeProduction(false);
        }
    },[]);
    const elementArray = props.data.map((element)=>{
        
        let DOMElement = element.getNewClass();
        
          
          return <DOMElement id={element.id}
          key={element.id} isSelected={false} ></DOMElement>
        
      });

    return (<>
    <div>
    <div style={{position:'absolute',top:"0px",left:"0px", width:"1024px",height:"576px", backgroundColor:"#f0f0f0",
    border:"2px solid black" }}>

      {elementArray}

    </div>
    <div style={{position:'absolute',top:"580px",left:"0px", width:"1024px", backgroundColor:"#f0f0f0",
    border:"2px solid black" }}><button onClick={(ev)=>{props.history.goBack();}}>BACK</button></div>
    
    </div>
    </>);




}

