import React,{useState, useEffect} from 'react';
import {MoveableComponent} from '../base-components/movable-component';
import { saveState } from '../appstate/componentInfo';
import { BaseComponent } from '../base-components/base-component';





export class ImageComponent extends BaseComponent {
    id;
    constructor(id) {
      super("image");
      this.id = id;
    }

    properties = {
      imgSrcValue : {
        type:"text",
        value:"logo 640.png"
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
      return <img draggable={isSelected} src={this.properties.imgSrcValue.value} style={style}></img>;
      };
      return super.render(component);

    }



}



