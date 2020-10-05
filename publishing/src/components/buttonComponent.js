import React from 'react';
import { BaseComponent } from '../base-components/base-component';
import axios from 'axios';
import { AppState } from '../appstate/appState';
import { previewTriggerRender } from '../MainComponent/MainComponent';
import { v4 } from 'uuid';
import { constants } from '../constants';


export class ButtonComponent extends BaseComponent {
  
  static classNameUnique= "ButtonComponent";

  id;
  constructor(id) {
    super(ButtonComponent.classNameUnique)
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


  events = {
    clickEvent:{
      workFlowName:null
    }




  }

  
  setEventWorkflowName = (eventName,workFlowName) => {
    console.log(eventName,workFlowName);
    this.events[eventName].workFlowName = workFlowName;
  }


  setProperty = (propertyName,value) => {
      this.properties[propertyName].value=value;
  }



  clickFunction = () => {
    if(this.events.clickEvent.workFlowName !== null) {
      axios.get(constants.devServer+"/workFlows/"+this.events.clickEvent.workFlowName+".json").then((result)=>{
        const workFlow = result.data;
        const executor = require('../functions/executor');
        executor(workFlow,AppState);

        previewTriggerRender(v4());
      }).catch((err)=>{
        console.log(err);
      });

    }

  }


  getNewClass() {
    let component = (isSelected,style) => {
    return <button onClick={(e)=>{
      console.log(e);
    }} draggable={isSelected} style={{...style,backgroundColor:this.properties.backgroundColor.value}}
    onClick={this.clickFunction}>{this.properties.textValue.value}</button>;
    };
    return super.render(component);

  }



}
        
    
    