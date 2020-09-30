import React,{useState, useEffect} from 'react';
import {MoveableComponent} from '../base-components/movable-component';
import {saveState} from '../appstate/componentInfo';
import { BaseComponent } from '../base-components/base-component';


export class ButtonComponent extends BaseComponent {
  id;
  constructor(id) {
    super("button")
    this.id = id;

  }
  properties = {
    textValue : {
      type:"text",
      value:"Hello Text"
    },
    backgroundColor : {
      type:"text",
      value:"#fff000",
    }
  }

  setProperty = (propertyName,value) => {
      this.properties[propertyName].value=value;
  }


  getNewClass() {
    let component = (isSelected,style) => {
    return <button draggable={isSelected} style={{...style,backgroundColor:this.properties.backgroundColor.value}}>{this.properties.textValue.value}</button>;
    };
    return super.render(component);

  }



}
        
    
    