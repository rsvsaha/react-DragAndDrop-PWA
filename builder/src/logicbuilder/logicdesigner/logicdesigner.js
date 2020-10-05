import React, { useState, useEffect } from 'react';
import { v4 } from 'uuid';
import axios from 'axios';
import { logicDictionary } from '../logicDictionary';
import { LogicPropertyEditor } from './logicPropertyEditor';
import { constants } from '../../constants';


export var config = [];
var ctr = 0;
// var workflow = v4();

var workflowName = v4();
const executor = require('../../functions/executor');
    
export const LogicDesigner = (props) => {
    
    const [workflow,modifyWorkflow] = useState([]);
    
    const [selectedId,setSelectedId] = useState(null);

    
    useEffect(()=>{
        console.log(config);
    });

    const addToWorkFlow = (functionName,functionType) =>{
                        let noOfArgs = logicDictionary[functionType][functionName].length;
                        let args = [];
                        for(let i=0;i<noOfArgs;i++){
                            if(logicDictionary[functionType][functionName][i].type === "execution"){
                                axios.get(constants.devServer+"/workFlows/appInit.json").then((result)=>{
                                    args.push(
                                        {
                                            id:"v4()",
                                            functionName:"executionBlock",
                                            functionType:"LogicBlocks",
                                            functionArgs:result.data
                                        
                                        
                                        });
                                }).catch((err)=>{
                                    args.push([{
                                        id:"v4()",
                                        functionName:"executionBlock",
                                        functionType:"LogicBlocks",
                                        functionArgs:[]
                                
                                    }])
                                })
                                
                            }else{
                                args.push(variableNameGenerator());
                            }   
                        }
                        let processId =v4();
                        let processObject = {
                            id:processId,
                            functionName:functionName,
                            functionType:functionType,
                            functionArgs:args
                        }
                        if(functionName === "executionBlock"){
                            console.log(processObject);
                        }

                        ;
                        // If a step is selected add the new step below it else add the new step to the last
                        if(selectedId !== null){
                            let toInsertIndex = null;
                            for(let i=0;i<config.length;i++){
                                if(config[i].id === selectedId){
                                    toInsertIndex = i;
                                    break;
                                }
                            }
                            if(toInsertIndex !== null) {
                                config.splice(toInsertIndex,0,processObject);

                            }
                            else{
                                config.push(processObject);
                        
                            }
                        }else {
                            config.push(processObject);
                        
                        }

                        modifyWorkflow(
                            config.map((value)=>{
                                return {id:value.id,functionName:value.functionName,functionType:value.functionType};
                            }));
    }

    const removeFromWorkFlow = (id) => {
                let toDeleteIndex = null;
                for(let i=0;i<config.length;i++){
                    if(config[i].id === id){
                        toDeleteIndex = i;
                        break;
                    }
                }

                if(toDeleteIndex !== null){
                    config.splice(toDeleteIndex,1);
                }
                modifyWorkflow(
                    config.map((value)=>{
                        return {id:value.id,functionName:value.functionName,functionType:value.functionType};
                }));
                setSelectedId(null);
    }
    
    const logicObject = config.filter((value)=>{ return (value.id === selectedId) ? true : false;})[0];


    
    return (<div>
                <div onClick={(ev)=>{setSelectedId(null);}} style={{width:"80%",float:"left",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                     {workflow.map((value)=>{
                        let color = "blue"
                        if(value.functionType === "BasicFunctions"){
                            color = "red"
                        }else if (value.functionType === "LogicBlocks"){
                            color="yellow"
                        }else if (value.functionType === "LogicalFunctions"){
                            color="green"
                        }else if(value.functionType === "LoopBlocks"){
                            color = "blue"
                        }else if (value.functionType === "NetworkBlocks") {
                            color = "#f00f32"
                        }
                        
                    return(<div onClick={(ev)=>{
                        ev.stopPropagation();
                        setSelectedId(value.id)}}
                            key={value.id} style={{maxWidth:"200px",display:"flex",alignItems:"center",
                            justifyContent:"center",height:"50px",backgroundColor:color,margin:"10px", border:
                            (value.id === selectedId) ? "5px solid black": "2px dashed black"}}>
                            {value.functionName}
                            </div>);
                    })
                    } 
                </div>
                <div style={{width:"20%",float:"right"}}>
                    {Object.keys(logicDictionary).map((functionType,index)=>{

                        return (<div key={index} >
                                <div>{functionType}</div>
                                {
                                    Object.keys(logicDictionary[functionType]).map((functionName,index)=>{
                                    return <button key={index} onClick={(ev)=>{addToWorkFlow(functionName,functionType)}}>{functionName}</button>;
                                    })
                                }
                        </div>)

                    })}
                    <div>
                        WorkFlowName:<input type="text" defaultValue={workflowName} onChange={(ev)=>{
                            workflowName = ev.target.value;
                        }}></input>
                    </div>
                    <div>
                    
                    <button onClick={(event)=>{
                        axios.post(constants.devServer+"/saveWorkflow/"+workflowName,config).then((result)=>{
                            console.log(result);
                        });


                    }}>Save workflow</button>
                    <button onClick={(event)=>{
                        axios.get(constants.devServer+"/workFlows/"+workflowName+".json",config).then((result)=>{
                            console.log(result.data);
                        });


                    }}>Execute WorkFlow</button>
                    </div>
                    <div>
                        {
                            (selectedId !== null) ?  (<div style={{borderStyle:"dashed"}}>
                                    {
                                        <LogicPropertyEditor removeFromWorkFlow={removeFromWorkFlow} {...logicObject} ></LogicPropertyEditor>
                                    }

                            </div>)
                            :null
                        }

                    
                    </div>



                 </div>

                    
                </div>
                


                );
    
};






const variableNameGenerator = () =>{
    ctr +=1;
    return "variable"+ctr;
};
