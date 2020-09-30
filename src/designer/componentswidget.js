import React from 'react';
import { v4 } from 'uuid';
import {ButtonComponent} from '../components/buttonComponent';
import { TextComponent } from '../components/textComponent';
import { ImageComponent } from '../components/imageComponent';
import { TextInputComponent } from '../components/textInputComponent';
import { CompositeComponent } from '../components/compositeComponent';

export const ComponentsWidget = (props) => {

    return (
        <div style={{float:"right",width:"200px",height:"576px",backgroundColor:"black",
        border:"2px solid black"}}>
            <div>
              <button onClick={
                (event) => {
                    props.data.push(new ButtonComponent(v4()));
                    props.triggerRender(v4());
                }
                }>ADD BUTTON</button>
            </div>
            <div>
              <button onClick={
                          (event) => {
                            props.data.push(new TextComponent(v4()));
                            props.triggerRender(v4());
                            }
                      } >ADD TEXT</button>
            </div>
            <div>
              <button onClick={
                          (event) => {
                            props.data.push(new TextInputComponent(v4()));
                            props.triggerRender(v4());
                            }
                      } >ADD TEXTINPUT</button>
            </div>
            <div>
              <button onClick={
                          (event) => {
                            props.data.push(new ImageComponent(v4()));
                            props.triggerRender(v4());
                            }
                      } >ADD IMAGE</button>
            </div>
            <div>
            <button onClick={
                          (event) => {
                            props.data.push(new CompositeComponent(v4()));
                            props.triggerRender(v4());
                            }
                      } >ADD COMPLEX</button>
            </div>
          </div>
          
    )

}