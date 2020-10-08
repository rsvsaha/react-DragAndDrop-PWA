import React,{useState} from 'react';
import { logicDictionary } from '../logicDictionary';
import { v4 } from 'uuid';
import { LogicalFunctions } from './logicalFunctions';
import { BasicFunctions } from './basicFunctions';
import {LogicBlocks} from './logicBlocks';
import { HintBlock } from '../helperBlocks/hintBlock';

export const LoopBlocks = ({index,workFlow,data,triggerRender,removeFromWorkFlow}) =>{
    const [hintState,setHintState] = useState(false);

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
                <div style={{width:"50%"}}>{data.functionName}</div><div style={{width:"30%"}}>{data.functionType}</div>
                <div style={{width:"20%"}}>
                    <button onClick={(ev)=>{removeFromWorkFlow(workFlow,index);}}>DELETE</button>
                    <button onClick={(ev)=>{setHintState((prevState) => !prevState);}}>{(hintState) ? "HIDE HINT":"SHOW HINT"}</button>
                </div>
            </div>
            {
                logicDictionary[data.functionType][data.functionName].map((value,valIndex)=>{
                    
                    if(value.type === "text") {
                        return(<div key={valIndex} style={{display:"flex",flexDirection:"row"}}>
                            <div style={{width:"50%"}}><label>{value.fieldName}</label></div>
                            <div style={{width:"50%"}}>
                                <input key={v4()} type="text" defaultValue={data.functionArgs[valIndex]}
                                onChange={(ev)=>{ data.functionArgs[valIndex] = ev.target.value;}}
                                ></input>
                            </div>
                        </div>);
                    }
                    
                    else if(value.type === "execution") {
                        return(<div key={valIndex} style={{display:"flex",flexDirection:"column"}}>
                                <div style={{width:"100%"}}><label>{value.fieldName}</label></div>
                                <div style={{width:"100%",minHeight:"100px",backgroundColor:"#C65433",paddingBottom:"50px"}}
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
                                       
                                    }else if (value.functionType === "LoopBlocks") {
                                        return (<LoopBlocks key={exectionIndex} index={exectionIndex} 
                                            workFlow={workFlow[index].functionArgs[valIndex].functionArgs} data={value}
                                            triggerRender={triggerRender}
                                            removeFromWorkFlow={removeFromWorkFlow}></LoopBlocks>);
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
        {
            (hintState) ? <HintBlock functionName={data.functionName} functionType={data.functionType}></HintBlock> : null
        }
        </div>
        

    </div>)
}