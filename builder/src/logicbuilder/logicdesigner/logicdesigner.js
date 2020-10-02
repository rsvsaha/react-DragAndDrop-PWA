import React, { useState, useEffect } from 'react';
import { v4 } from 'uuid';
import axios from 'axios';


var config = [];
var id = null;
var ctr = 0;
var workflow = v4();
    
export const LogicDesigner = (props) => {
    
    const [workflow,modifyWorkflow] = useState([]);
    const executor = require('../../functions/executor');
    
    useEffect(()=>{
        console.log(config);
    });
    return (<div>
                <div style={{width:"80%",float:"left"}}>
                    {workflow.map((value)=>{
                        let color = "blue"
                        if(value.type === "createVariable"){
                            color = "red"
                        }else if (value.type === "assignFunction"){
                            color="yellow"
                        }else if (value.type === "printFunction"){
                            color="green"
                        }


                        return <div key={value.id}style={{width:"50px",height:"50px",backgroundColor:color,border:"5px solid transparent"}}></div>
                    })}
                </div>
                <div style={{width:"20%",float:"right"}}>
                    <button onClick={(event)=>{ 
                        id = v4();
                        let processId =v4();
                        config.push(
                            {
                                id:processId,
                                functionName:"createVariable",
                                functionType:"BasicFunctions",
                                functionArgs:[id]
                            });
                        modifyWorkflow(prevState => {
                            return [{type:"createVariable",id:processId},...prevState];
                        });

                    }} >CREATE VARIABLE</button>
                    <button onClick={(event)=>{
                        let processId =v4();
                        
                        config.push({
                            id:processId,
                            functionName:"assignFunction",
                            functionType:"BasicFunctions",
                            functionArgs:[id, ctr]
                    
                        });
                        modifyWorkflow(prevState => {
                            return [{type:"assignFunction",id:processId},...prevState];
                        });

                    }} >ASSIGN VARIABLE</button>
                    <button onClick={(event)=>{
                        let processId =v4();
                        config.push({
                            id:processId,
                            functionName:"printFunction",
                            functionType:"BasicFunctions",
                            functionArgs:[id]
                        });
                        modifyWorkflow(prevState => {
                            return [{type:"printFunction",id:processId},...prevState];
                        });

                    }} >PRINT VARIABLE</button>
                    
                    
                    <div>
                    <div>
                    <button onClick={(event)=>{
                        ctr += 1 ;
                    }} >INCREMENT VARIABLE</button>
                    
                    </div>
                    <button onClick={(event)=>{
                        axios.get("http://localhost:8085/getWorkflow/"+workflow,config).then((result)=>{
                            console.log(result.data);
                            executor(result.data,new Map());
                        });
                        
                    }}>Execute workflow</button>
                    
                    <button onClick={(event)=>{
                        let wF2 = [
                            {
                                id:v4(),
                                functionName:"createVariable",
                                functionType:"BasicFunctions",
                                functionArgs:["urlVariable"]
                            },
                            {
                                id:v4(),
                                functionName:"createVariable",
                                functionType:"BasicFunctions",
                                functionArgs:["urlResultVariable"]
                            },
                            {
                                id:v4(),
                                functionName:"assignFunction",
                                functionType:"BasicFunctions",
                                functionArgs:["urlVariable", "http://localhost:8085/"]
                        
                            },
                            {
                                id:v4(),
                                functionName:"networkGET",
                                functionType:"NetworkBlocks",
                                functionArgs:["urlVariable","urlResultVariable",{
                                    id:v4(),
                                    functionName:"executionBlock",
                                    functionType:"LogicBlocks",
                                    functionArgs:[{
                                        id:v4(),
                                        functionName:"printFunction",
                                        functionType:"BasicFunctions",
                                        functionArgs:["urlResultVariable"]
                                    }]
                                
                                }]
                        
                            }
                        ]

                        executor(wF2,new Map());



                    }}>Execute N/W Request</button>
                    

                    <button onClick={(event)=>{
                        
                        axios.post("http://localhost:8085/saveWorkflow/"+workflow,config).then((result)=>{
                            console.log(result);
                        });


                    }}>Save workflow</button>
                    
                    </div>

                    
                    

                </div>
                

    </div>);
    
}