import React, { useEffect,useState,useReducer } from 'react';
import {ButtonComponent} from '../components/buttonComponent';
import { TextComponent } from '../components/textComponent';
import {v4} from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { componentState } from '../appstate/componentInfo';
import { TextInputComponent } from '../components/textInputComponent';
import { disselectionAction } from '../appstate/appStateAndReducer';
import { ImageComponent } from '../components/imageComponent';

export const Designer = (props) => {
    // const [elementArray,setElementArray] = useState([]);
    const [renderString,triggerRender] = useState(v4());
    const selectedId = useSelector(state => state.appStateReducer.selectedId)
    const dispatch = useDispatch();
    useEffect(()=>{

        console.log("ElementState",props.data);
        
    });
    
    
    console.log("SelecteId",selectedId);
    const elementArray = props.data.map((element)=>{
      if(element.type === "TextComponent") {
        if(element.index === selectedId) {
          return <TextComponent  id={element.index}
          key={element.index} isSelected={true}></TextComponent>   
        }
        return <TextComponent  id={element.index}
           key={element.index} isSelected={false}></TextComponent>
      }else if(element.type === "ButtonComponent") {
        if(element.index === selectedId) {
          return <ButtonComponent  id={element.index}
          key={element.index} isSelected={true}></ButtonComponent>   
        }
        return <ButtonComponent   id={element.index}
           key={element.index} isSelected={false}></ButtonComponent>
      }
      else if(element.type === "TextInputComponent") {
        if(element.index === selectedId) {
          return <TextInputComponent  id={element.index}
          key={element.index} isSelected={true}></TextInputComponent>   
        }
        return <TextInputComponent   id={element.index}
           key={element.index} isSelected={false}></TextInputComponent>
      }
      else if(element.type === "ImageComponent") {
        if(element.index === selectedId) {
          return <ImageComponent  id={element.index}
          key={element.index} isSelected={true}></ImageComponent>   
        }
        return <ImageComponent   id={element.index}
           key={element.index} isSelected={false}></ImageComponent>  
      }
      
    });





    console.log("Component State",componentState);
    // checkArray(elementArray);
    return (

        <div>
          <div style={{position:'absolute',top:"0px",left:"0px", width:"1024px",height:"576px", backgroundColor:"#f0f0f0",
          border:"2px solid black" }} onClick={(event)=>{dispatch(disselectionAction())}}>
      
            {elementArray}
    
          </div>
          <div style={{position:'absolute',top:"0px",left:"1025px",width:"200px",height:"576px",backgroundColor:"black",
        border:"2px solid black"}}>
            <div>
              <button onClick={
                (event) => {
                    props.data.push({index:v4(),type:"ButtonComponent"})
                    triggerRender(v4());
                }
                }>ADD BUTTON</button>
            </div>
            <div>
              <button onClick={
                          (event) => {
                            props.data.push({index:v4(),type:"TextComponent"})
                            triggerRender(v4());
                            }
                      } >ADD TEXT</button>
            </div>
            <div>
              <button onClick={
                          (event) => {
                            props.data.push({index:v4(),type:"TextInputComponent"})
                            triggerRender(v4());
                            }
                      } >ADD TEXTINPUT</button>
            </div>
            <div>
              <button onClick={
                          (event) => {
                            props.data.push({index:v4(),type:"ImageComponent"})
                            triggerRender(v4());
                            }
                      } >ADD IMAGE</button>
            </div>
            <div>
              <button onClick={
                (event) => {
                  console.log(componentState);    
                }
                }>SHOW STATE</button>
            </div>
          </div>
          <div style={{position:'absolute',top:"577px",left:"0px",width:"1224px",height:"160px",
        border:"2px solid black"}}>
              <div>SelectedId:{selectedId}</div>
          </div>
    
        </div>
    
            
      );
}


const checkArray = (arr) => {
  var ref = React.createRef();
  arr.forEach(element => {
    ref = element;
    console.log(ref.current.getDetails);
  });

}