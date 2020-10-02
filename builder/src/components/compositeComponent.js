import React from 'react';
import { BaseComponent } from '../base-components/base-component';

export class CompositeComponent extends BaseComponent {
  
  id;
  constructor(id) {
    super("complex")
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
    return <div draggable={isSelected} style={{...style,backgroundColor:this.properties.backgroundColor.value}}>
            <div style={{width:"100%"}}>This is my component</div>
            <div style={{width:"100%"}}>This is my component</div>
        </div>
    };
    return super.render(component);

  }
        
    
}



