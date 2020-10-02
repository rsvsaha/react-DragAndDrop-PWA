import React from 'react';
import { BaseComponent } from '../base-components/base-component';

export class TextComponent extends BaseComponent {
  
  id;
  constructor(id) {
    super("text")
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

  
  
  getProperties() {
    return this.properties;
  }


  getNewClass() {
    let component = (isSelected,style) => {
    return <div draggable={isSelected} style={{...style,backgroundColor:this.properties.backgroundColor.value}}>{this.properties.textValue.value}</div>
    };
    return super.render(component);

  }
        
    
}



