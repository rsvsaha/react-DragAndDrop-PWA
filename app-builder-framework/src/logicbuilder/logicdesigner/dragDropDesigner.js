import React, { useState } from 'react';
import { logicDictionary } from '../logicDictionary';
import { v4 } from 'uuid';
import { BasicFunctions } from '../logicUIblocks/basicFunctions';
import { LogicalFunctions } from '../logicUIblocks/logicalFunctions';
import { LogicBlocks } from '../logicUIblocks/logicBlocks';
import axios from 'axios';
import { LoopBlocks } from '../logicUIblocks/loopBlocks';
import { constants } from '../../constants';
import { executor } from '../../functions/executor';
import { MathBlocks } from '../logicUIblocks/mathBlocks';
var workFlow=[];
var workflowName = "";
export const DragDropLogicDesigner = (props) => {
    
    const [renderString,triggerRender] = useState(v4());
    const removeFromWorkFlow = (workFlowArray,index) => {
            workFlowArray.splice(index,1);
            triggerRender(v4());
    }
    
    
    console.log(workFlow);

    
    
    return (<div style={{display:"flex",flexDirection:"row",}}>
        <div style={{flex:4,minHeight:"1000px",display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center",backgroundColor:"#f03040",padding:"2px"}}
         onDrop={(ev)=>{
            ev.preventDefault();
            var data = JSON.parse(ev.dataTransfer.getData("functionObject"));
            workFlow.push(data);
            triggerRender(v4());
        }}
        onDragOver={(ev)=>{ev.preventDefault();}}
        >
            {
             workFlow.map((value,index)=>{
                 
                 if(value.functionType === "BasicFunctions") {
                     return (<BasicFunctions key={index} index={index} 
                     workFlow={workFlow} data={value}
                     triggerRender={triggerRender}
                     removeFromWorkFlow={removeFromWorkFlow}></BasicFunctions>);
                     }
                 else if(value.functionType === "LogicalFunctions") {
                    
                    return (<LogicalFunctions key={index} index={index} 
                        workFlow={workFlow} data={value}
                        triggerRender={triggerRender}
                        removeFromWorkFlow={removeFromWorkFlow}></LogicalFunctions>);
                    
                 }else if(value.functionType === "LogicBlocks") {
                    return (<LogicBlocks key={index} index={index} 
                        workFlow={workFlow} data={value}
                        triggerRender={triggerRender}
                        removeFromWorkFlow={removeFromWorkFlow}></LogicBlocks>);
                    
                }else if (value.functionType === "LoopBlocks") {
                    return (<LoopBlocks key={index} index={index} 
                        workFlow={workFlow} data={value}
                        triggerRender={triggerRender}
                        removeFromWorkFlow={removeFromWorkFlow}></LoopBlocks>);
                }else if (value.functionType === "MathBlocks") {
                    return(<MathBlocks key={index} index={index} 
                        workFlow={workFlow} data={value}
                        triggerRender={triggerRender}
                        removeFromWorkFlow={removeFromWorkFlow}></MathBlocks>);
                }

                 return <div key={index} style={{width:"95%",minHeight:"50px",marginTop:"2px",border:"1px dashed black"}}>
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
   
                     >{value.functionName}</div>
                 </div>
             })
         }
        </div>
        
        
        
        
        
        <div style ={{flex:1,minHeight:"500px",backgroundColor:"#f05099"}}>
        {Object.keys(logicDictionary).map((functionType,index)=>{

            return (<div key={index} >
                    <div>{functionType}</div>
                    {
                        Object.keys(logicDictionary[functionType]).map((functionName,index)=>{
                        return <div style={{backgroundColor:"#30f2f1",margin:"2px"}} key={index} 
                            draggable={true} onDragStart={(ev)=>{
                                let functionObject = {id:v4(),functionName:functionName,functionType:functionType,functionArgs:[]};
                                let args = logicDictionary[functionType][functionName];
                                for(let i=0;i<args.length;i++){
                                    if(args[i].type === "text") {
                                        functionObject.functionArgs.push(variableNameGenerator());
                                    }else if(args[i].type === "execution"){
                                        functionObject.functionArgs.push({
                                            id:v4(),functionName:"executionBlock",functionType:"LogicBlocks",functionArgs:[]
                                        });
                                    }
                                }
                                ev.dataTransfer.setData("functionObject",
                                JSON.stringify(
                                    functionObject
                                )
                                );
                            }}
                        >{functionName}</div>;
                        })
                    }
            </div>)

        })}
        <div>
        <label>WorkFlowName</label>
        <input type="text" defaultValue={workflowName} onChange={(ev)=>{
            workflowName = ev.target.value;
        }}></input>
        </div>
        <button onClick={(ev)=>{
            executor(workFlow,new Map());
        }}>EXECUTE</button>
        <button onClick={(ev)=>{
            let appName = props.match.params.appName;
            if(! (workflowName === "" )){
                axios.post(constants.devServer+"/saveWorkflow/"+appName+"/"+workflowName,workFlow).then((result)=>{
                    console.log(result);
                }).catch((err)=>{
                    console.log(err);
                    alert("Error in Saving WorkFlow.")
                });
    
            }else {
                alert("WorkFlow Name cannot be empty");
            }
            
        }}>SAVE WORKFLOW</button>
        <button onClick={(ev)=>{
            let appName = props.match.params.appName;
            
            axios.get(constants.devServer+"/getWorkflow/"+appName+"/"+workflowName).then((result)=>{
                    workFlow = result.data;
                    triggerRender(v4());
             }).catch((error)=>{
                 
                console.log(error);
                alert("Error in opening WorkFlow Please Check the WorkFlow Name");
            });
            
        }}>OPEN WORKFLOW</button>
        </div>
        
    </div>)
}

var ctr =0;
const variableNameGenerator = () =>{
    ctr +=1;
    return "variable"+ctr;
};
