import React from 'react';
import { BaseComponent } from '../base-components/base-component';
import { v4 } from 'uuid';
import { AppState } from '../appstate/appState';

export class TextInputComponent extends BaseComponent {
  
  static classNameUnique= "TextInputComponent";

  id;
  constructor(id) {
    super(TextInputComponent.classNameUnique);
    this.id = id;

  }
  
  // getProperties() {
  //   return {id:this.id,...super.getDetails()};
  // }


  inputVariable = {
    fieldVariable:{
      type:"variable",
      value:null
    }

  }

  setInputVariable = (fieldName,value) => {
    this.inputVariable[fieldName].value = value;
  }





  getNewClass() {
    let component = (isSelected,style) => {
    return <input type="text" draggable={isSelected} style={style} onChange={(ev)=>{
      if(this.inputVariable.fieldVariable.value !== null) {
        const executor = require('../functions/executor');
        const workFlow = [
          {id:v4(),
          functionName:"assignFunction",
          functionType:"BasicFunctions",
          functionArgs:[this.inputVariable.fieldVariable.value, ev.target.value]
        }];
        executor(workFlow,AppState);
      }
      

    }}></input>
    };
    return super.render(component);

  }    
}



