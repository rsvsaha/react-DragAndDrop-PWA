import React from 'react';
import { BaseComponent } from '../base-components/base-component';
import { AppState } from '../appstate/appState';

export class MessageComponent extends BaseComponent {
  static classNameUnique = "MessageComponent";
  id;
  constructor(id) {
    super(MessageComponent.classNameUnique);
    this.id = id;

  }

  properties = {
    messageVariable : {
      type:"text",
      value:"variable1"
    },
    backgroundColor : {
      type:"text",
      value:"#fff000",
    }
  }


  setProperty = (propertyName,value) => {
      this.properties[propertyName].value=value;
  }

  
  
  getProperties() {
    return this.properties;
  }


  getNewClass() {
    let component = (isSelected,style) => {
    return <div draggable={isSelected} style={{...style,backgroundColor:this.properties.backgroundColor.value}}>{AppState.get(this.properties.messageVariable.value)}</div>
    };
    return super.render(component);

  }
        
    
}



