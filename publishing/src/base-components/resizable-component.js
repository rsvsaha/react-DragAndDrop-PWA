import React,{useEffect,useState} from 'react';
import './style.css';
// import { useDispatch } from 'react-redux';
// import { selectionAction, dragResizeAction } from '../appstate/appStateAndReducer';


export const ResizeableComponent = (props) => {

    
    const [resizeBorderWidth,actResizeBorderWidth] =  useState(props.width+10);
    // const dispatch = useDispatch();
    
    
    useEffect(()=>{
        actResizeBorderWidth(props.width+10);
        
    },[props.width]);
    var startY,stopY,startX,stopX;
    
    useEffect(()=>{
        if(props.isSelected){
            console.log({X:props.posX,Y:props.posY,width:props.width,height:props.height});
            // dispatch(dragResizeAction({X:props.posX,Y:props.posY,width:props.width,height:props.height}));
        }
        
    });

    const startResizingHeight = (event) => {
        event.stopPropagation();
        console.log("Start Resizing Height:"+event.pageY);
        startY = event.pageY;
    }

    const stopResizingHeight = (event,top) => {
        console.log("Stop Resizing Height:"+event.pageY);
        event.stopPropagation();
        stopY = event.pageY;
        if(top) {
            props.handleYChanges(stopY);
            props.handleHeightChanges(-(stopY - startY));
            
        }
        else {
            props.handleHeightChanges(stopY - startY);
        }
        
    }


    const startResizingWidth = (event) => {
        event.stopPropagation();
        console.log("Start Resizing Width:"+event.pageX);
        startX = event.pageX;
    }

    const stopResizingWidth = (event,left) => {
        event.stopPropagation();
        console.log("Stop Resizing Width:"+event.pageX);
        stopX = event.pageX;
        if(left) {
            props.handleXChanges(stopX);
            props.handleWidthChanges(-(stopX - startX));
            
        }
        else {
            props.handleWidthChanges(stopX - startX);
        }
        
    }

    const selectionEvent = (event) =>{
        event.stopPropagation();
        // dispatch(disselectionAction());                
        // dispatch(selectionAction(props.id,{X:props.posX,Y:props.posY,width:props.width,height:props.height}));
    };

    console.log("Resizable Component Render",props.posX,props.posY);
    return (
        <div onDragEnd={(event)=>{
            event.stopPropagation();
            if(props.isSelected) {
                props.handleXChanges(event.pageX-(props.width/2));
                props.handleYChanges(event.pageY-(props.height/2));
            
            }
            }} 
        onClick={(event)=>{selectionEvent(event)}} 
        style={{position:'absolute', top:props.posY+"px", left:props.posX+"px", display:"flex", flexDirection: "column"}}>
        
            <div draggable={props.isSelected} onDragStart={startResizingHeight} 
            onDragEnd={(event)=>{stopResizingHeight(event,true)}} 
            style={{visibility: (props.isSelected) ? 'visible' : 'hidden', height:"5px",width:resizeBorderWidth+"px",cursor:"ns-resize" ,backgroundColor:"yellow"}}></div>
            
            <div style={{display:"flex", flexDirection: "row"}}>
                <div draggable={props.isSelected} onDragStart={startResizingWidth} 
                onDragEnd={(event)=>{stopResizingWidth(event,true)}}
                style={{visibility: (props.isSelected) ? 'visible' : 'hidden', height:props.height+"px",width:"5px",cursor:"ew-resize", backgroundColor:"yellow"}}></div>
                
                
                    {props.children}
                
                
                <div draggable={props.isSelected} onDragStart={startResizingWidth} 
                onDragEnd={(event)=>{stopResizingWidth(event,false)}}
                style={{visibility: (props.isSelected) ? 'visible' : 'hidden', height:props.height+"px",width:"5px",cursor:"ew-resize", backgroundColor:"yellow"}}></div>

            </div>
            
            <div draggable={props.isSelected} onDragStart={startResizingHeight} 
            onDragEnd={(event)=>{stopResizingHeight(event,false)}} 
            style={{visibility: (props.isSelected) ? 'visible' : 'hidden', height:"5px",width:resizeBorderWidth+"px",cursor:"ns-resize", backgroundColor:"yellow"}}></div>
            
        </div>
    );

}