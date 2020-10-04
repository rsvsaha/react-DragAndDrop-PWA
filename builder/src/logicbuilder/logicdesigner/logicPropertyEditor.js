import React from 'react';
import { logicDictionary } from '../logicDictionary';
import { config } from './logicdesigner';
import { v4 } from 'uuid';
export const LogicPropertyEditor = (props) => {

    const id = props.id;
    const functionType = props.functionType;
    const functionName = props.functionName;
    const args = props.functionArgs;

    var changeArgs = [...args];
    

    console.log("Rendering");

    console.log(changeArgs);
    return(

        <div>
            { args.map((value,index)=> { 
                
                return (                
                    <div key={index} >

                        <label key={index}>{logicDictionary[functionType][functionName][index].fieldName}</label>
                        <input key={v4()} type="text" defaultValue={args[index]} 
                        onChange={(ev)=>{changeArgs[index] =ev.target.value; }}></input>

                    </div>);})

            }
            <button onClick={(ev)=>{
                console.log(props.id);
                
                for(let i=0;i<config.length;i++){
                    if(config[i].id === props.id){
                        console.log(config[i]);
                        config[i].functionArgs = changeArgs;
                        break;
                    }
                }
                console.log(config);
                    
            }}>SAVE</button>
            
            <button onClick={(ev)=>{
                props.removeFromWorkFlow(id);
                    
            }}>DELETE</button>

        </div>


    )






};
