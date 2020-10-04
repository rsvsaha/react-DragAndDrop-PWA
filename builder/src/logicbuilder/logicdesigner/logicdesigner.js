import React, { useState, useEffect } from 'react';
import { v4 } from 'uuid';
import axios from 'axios';
import { logicDictionary } from '../logicDictionary';


var config = [];
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
                                args.push("");
                            }else{
                                args.push(variableNameGenerator());
                            }
                            
                        }

                        let processId =v4();
                        config.push(
                            {
                                id:processId,
                                functionName:functionName,
                                functionType:functionType,
                                functionArgs:args
                            });
                        modifyWorkflow(prevState => {
                            return [...prevState,{functionName:functionName,
                                functionType:functionType,id:processId}];
                        });
    }
    
    const logicObject = config.filter((value)=>{ return (value.id === selectedId) ? true : false;})[0]



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
                        axios.post("http://localhost:8085/saveWorkflow/"+workflowName,config).then((result)=>{
                            console.log(result);
                        });


                    }}>Save workflow</button>
                    </div>
                    <div>
                        {
                            (selectedId !== null) ?  (<div style={{borderStyle:"dashed"}}>
                                    {
                                        <LogicPropertyEditor {...logicObject} ></LogicPropertyEditor>
                                    }

                            </div>)
                            :null
                        }

                    
                    </div>



                 </div>

                    
                </div>
                
);
    
};


const LogicPropertyEditor = (props) => {

    const id = props.id;
    const functionType = props.functionType;
    const functionName = props.functionName;
    const args = props.functionArgs;

    var changeArgs = [...args];

    console.log("Rendering");

    console.log(props);
    return(

        <div>
            { args.map((value,index)=> { 
                return (                
                    <div key={index} >

                        <label>{logicDictionary[functionType][functionName][index].fieldName}</label>
                        <input type="text" defaultValue={args[index]} 
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
            

        </div>


    )






};




const variableNameGenerator = () =>{
    ctr +=1;
    return "variable"+ctr;
};
