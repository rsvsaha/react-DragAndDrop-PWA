import React from 'react';
import { BaseComponent } from '../base-components/base-component';

export class LinkComponent extends BaseComponent {
  
  static classNameUnique= "LinkComponent";

  id;
  constructor(id) {
    super(LinkComponent.classNameUnique)
    this.id = id;

  }

  properties = {
    linkText : {
      type:"text",
      value:"Hello I am Link"
    },
    backgroundColor : {
      type:"text",
      value:"#fff000",
    },
    linkUrl: {
      type:"text",
      value:""
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
            <a href={this.properties.linkUrl.value} target="_blank" >{this.properties.linkText.value}</a>
        </div>
    };
    return super.render(component);

  }
        
    
}