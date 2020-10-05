import React from 'react';
import { v4 } from 'uuid';
import {ButtonComponent} from '../components/buttonComponent';
import { TextComponent } from '../components/textComponent';
import { ImageComponent } from '../components/imageComponent';
import { TextInputComponent } from '../components/textInputComponent';
import { CompositeComponent } from '../components/compositeComponent';
import { MessageComponent } from '../components/messageComponent';

export const ComponentsWidget = (props) => {

    return (
        <div style={{float:"right",width:"200px",height:"576px",backgroundColor:"black",
        border:"2px solid black"}}>
            <div>
              <button onClick={
                (event) => {
                  props.addState(new ButtonComponent(v4()));  
                  // props.data.push(new ButtonComponent(v4()));
                    props.triggerRender(v4());
                }
                }>ADD BUTTON</button>
            </div>
            <div>
              <button onClick={
                          (event) => {
                            props.addState(new TextComponent(v4()));
                            props.triggerRender(v4());
                            }
                      } >ADD TEXT</button>
            </div>
            <div>
              <button onClick={
                          (event) => {
                            props.addState(new TextInputComponent(v4()));
                            props.triggerRender(v4());
                            }
                      } >ADD TEXTINPUT</button>
            </div>
            <div>
              <button onClick={
                          (event) => {
                            props.addState(new ImageComponent(v4()));
                            props.triggerRender(v4());
                            }
                      } >ADD IMAGE</button>
            </div>
            <div>
            <button onClick={
                          (event) => {
                            props.addState(new CompositeComponent(v4()));
                            props.triggerRender(v4());
                            }
                      } >ADD COMPLEX</button>
            </div>
            <div>
            <button onClick={
                          (event) => {
                            props.addState(new MessageComponent(v4()));
                            props.triggerRender(v4());
                            }
                      } >ADD MESSAGE BOX</button>
            </div>
          </div>
          
    )

}