import React,{useEffect,useState} from 'react';
import './style.css';


export const ResizeableComponent = (props) => {

    const [resizeBorderWidth,actResizeBorderWidth] =  useState(props.width);
    const [resizeBorderHeight,actResizeBorderHeight] = useState(props.height);
    const [isSelected,setIsSelected] = useState(false);
    const [isDraggable,setIsDraggable] = useState(false);
    useEffect(()=>{
        actResizeBorderWidth(resizeBorderWidth+10);
    },[]);
    
    useEffect(()=>{
        actResizeBorderWidth(props.width+10);
    },[props.width]);
    var startY,stopY,startX,stopX;
    

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
            props.handleWidthChanges(-(stopX - startX));
        }
        else {
            props.handleWidthChanges(stopX - startX);
        }
        
    }

    const clickEvent = (event) =>{
        console.log("Selected");
        event.stopPropagation();
        setIsDraggable((prevState)=>{
            return !prevState;
        });
        setIsSelected((prevState) => {
            return !prevState;
        });
        
    };

    return (
        <div onDragStart={(event)=>{console.log("DragStarted",event.pageX,event.pageY)}} onDragEnd={(event)=>{
            event.stopPropagation();
            if(isSelected) {
                props.handleXChanges(event.pageX-(props.width/2));
                props.handleYChanges(event.pageY-(props.height/2));
            
            }
            }} 
        onClick={(event)=>{clickEvent(event)}} 
        style={{position:'absolute', top:props.posY+"px", left:props.posX+"px", display:"flex", flexDirection: "column"}}>
        
            <div draggable={isDraggable} onDragStart={startResizingHeight} 
            onDragEnd={(event)=>{stopResizingHeight(event,true)}} 
            style={{visibility: (isSelected) ? 'visible' : 'hidden', height:"5px",width:resizeBorderWidth+"px",cursor:"ns-resize" ,backgroundColor:"yellow"}}></div>
            
            <div style={{display:"flex", flexDirection: "row"}}>
                <div draggable={isDraggable} onDragStart={startResizingWidth} 
                onDragEnd={(event)=>{stopResizingWidth(event,true)}}
                style={{visibility: (isSelected) ? 'visible' : 'hidden', height:props.height+"px",width:"5px",cursor:"ew-resize", backgroundColor:"yellow"}}></div>
                
                
                    {props.children}
                
                
                <div draggable={isDraggable} onDragStart={startResizingWidth} 
                onDragEnd={(event)=>{stopResizingWidth(event,false)}}
                style={{visibility: (isSelected) ? 'visible' : 'hidden', height:props.height+"px",width:"5px",cursor:"ew-resize", backgroundColor:"yellow"}}></div>

            </div>
            
            <div draggable={isDraggable} onDragStart={startResizingHeight} 
            onDragEnd={(event)=>{stopResizingHeight(event,false)}} 
            style={{visibility: (isSelected) ? 'visible' : 'hidden', height:"5px",width:resizeBorderWidth+"px",cursor:"ns-resize", backgroundColor:"yellow"}}></div>
            
        </div>
    );

}