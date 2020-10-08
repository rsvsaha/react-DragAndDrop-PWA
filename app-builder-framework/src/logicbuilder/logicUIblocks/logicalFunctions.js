import React,{useState} from 'react';
import { logicDictionary } from '../logicDictionary';
import { v4 } from 'uuid';
import { HintBlock } from '../helperBlocks/hintBlock';

export const LogicalFunctions = ({index,workFlow,data,triggerRender,removeFromWorkFlow}) =>{
    const [hintState,setHintState] = useState(false);

    return (
    <div style={{width:"95%",minHeight:"50px",marginTop:"2px",border:"1px dashed black"}}>
        
        <div style={{width:"100%",height:"100%",backgroundColor:"#C6E723"}}
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