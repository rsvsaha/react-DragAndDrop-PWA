import React, { useState, useEffect } from 'react';
import { v4 } from 'uuid';



var config = [];
var id = null;
var ctr = 0;
    
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
                        executor(config,new Map());
                    }}>Execute workflow</button>
                    </div>

                </div>
                

    </div>);
    
}