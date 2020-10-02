import React from 'react';
import { BaseComponent } from '../base-components/base-component';

export class TextInputComponent extends BaseComponent {
  id;
  constructor(id) {
    super("textinput")
    this.id = id;

  }
  
  // getProperties() {
  //   return {id:this.id,...super.getDetails()};
  // }


  getNewClass() {
    let component = (isSelected,style) => {
    return <input type="text" draggable={isSelected} style={style}></input>
    };
    return super.render(component);

  }    
}


