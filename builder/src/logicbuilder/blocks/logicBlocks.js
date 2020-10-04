import React from 'react';
import { logicDictionary } from '../logicDictionary';
import { v4 } from 'uuid';
import { LogicalFunctions } from './logicalFunctions';
import { BasicFunctions } from './basicFunctions';

export const LogicBlocks = ({index,workFlow,data,triggerRender,removeFromWorkFlow}) =>{
    
    return (
    <div style={{width:"95%",minHeight:"50px",marginTop:"2px",border:"1px dashed black"}}>
        
        <div style={{width:"100%",height:"100%",backgroundColor:"#f0f0f0"}}
        onDrop={(ev)=>{
            ev.preventDefault();
            ev.stopPropagation();
            var data = JSON.parse(ev.dataTransfer.getData("functionObject"));
            workFlow.splice(index+1,0,data);
            triggerRender(v4());
        }}
        onDragOver={(ev)=>{ev.preventDefault();
        ev.stopPropagation();}}
        >
            <div style={{display:"flex",flexDirection:"row"}}>
                <div style={{width:"50%"}}>{data.functionName}</div><div style={{width:"40%"}}>{data.functionType}</div>
                <div style={{width:"10%"}}>
                    <button onClick={(ev)=>{removeFromWorkFlow(workFlow,index);}}>DELETE</button>
                </div>
            </div>
            {
                logicDictionary[data.functionType][data.functionName].map((value,valIndex)=>{
                    if(value.type === "execution") {
                        return(<div key={valIndex} style={{display:"flex",flexDirection:"column"}}>
                                <div style={{width:"100%"}}><label>{value.fieldName}</label></div>
                                <div style={{width:"100%",minHeight:"100px",backgroundColor:"#C65433"}}
                                onDrop={(ev)=>{
                                    ev.preventDefault();
                                    ev.stopPropagation();
                                    var data = JSON.parse(ev.dataTransfer.getData("functionObject"));
                                    console.log(workFlow[index].functionArgs[valIndex]);
                                    workFlow[index].functionArgs[valIndex].functionArgs.push(data);
                                    triggerRender(v4());
                                }}
                                onDragOver={(ev)=>{ev.preventDefault();
                                ev.stopPropagation();}}
                                >{workFlow[index].functionArgs[valIndex].functionArgs.map((value,exectionIndex)=>{
                                    if(value.functionType === "BasicFunctions") {
                                        return (<BasicFunctions key={exectionIndex} index={exectionIndex} 
                                        workFlow={workFlow[index].functionArgs[valIndex].functionArgs} data={value}
                                        triggerRender={triggerRender}
                                        removeFromWorkFlow={removeFromWorkFlow}></BasicFunctions>);
                                    }
                                    else if(value.functionType === "LogicalFunctions") {
                                       
                                       return (<LogicalFunctions key={exectionIndex} index={exectionIndex} 
                                           workFlow={workFlow[index].functionArgs[valIndex].functionArgs} data={value}
                                           triggerRender={triggerRender}
                                           removeFromWorkFlow={removeFromWorkFlow}></LogicalFunctions>);
                                       
                                    }else if(value.functionType === "LogicBlocks") {
                                       return (<LogicBlocks key={exectionIndex} index={exectionIndex} 
                                           workFlow={workFlow[index].functionArgs[valIndex].functionArgs} data={value}
                                           triggerRender={triggerRender}
                                           removeFromWorkFlow={removeFromWorkFlow}></LogicBlocks>);
                                       
                                    }
                                    return <div key={exectionIndex} style={{width:"95%",minHeight:"50px",marginTop:"2px",border:"1px dashed black"}}>
                                        <div style={{width:"100%",height:"100%",backgroundColor:"#f0f0f0"}}
                                        onDrop={(ev)=>{
                                           ev.preventDefault();
                                           ev.stopPropagation();
                                           var data = JSON.parse(ev.dataTransfer.getData("functionObject"));
                                           workFlow[index].functionArgs[valIndex].functionArgs.splice(exectionIndex+1,0,data);
                                           triggerRender(v4());
                                       }}
                                       onDragOver={(ev)=>{ev.preventDefault();
                                       ev.stopPropagation();}}
                      
                                        >{value.functionName}</div>
                                    </div>
                                })
                                }</div>
                                </div>);
                    }
                    else{
                        return null;
                    }
                })
            }
        </div>

    </div>)
}