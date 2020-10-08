import React from 'react';
import { logicDictionary } from '../logicDictionary';

export const HintBlock = ({functionName,functionType}) =>{
    
    return (
    <div style={{width:"95%",border:"1px dashed black",backgroundColor:"#ffffff" }}>
        
        
            {
                logicDictionary[functionType][functionName].map((value,valIndex)=>{
                    
                      return(<div key={valIndex} style={{display:"flex",flexDirection:"row"}}>
                            <div style={{width:"50%"}}><label>{value.fieldName}:</label></div>
                            <div style={{width:"50%"}}><label>{value.hint}:</label></div>
                        </div>);
                    
                    
                })
            }
        
    </div>)
}