import React, { useEffect,useState } from 'react';
import axios from 'axios';
import { Designer } from './designer';
import { createClassFromConfigurations } from '../utilities/classCreatorUtility';
import { constants } from '../constants';
import { v4 } from 'uuid';

var appStateData = [];
var pendingStates = [];

export const DesignContainer = (props) => {

        
        const [isAppLoaded,setIsAppLoaded] = useState(false);
        const [reRender,triggerRender] = useState(v4());
        console.log(props);
        const appName = props.match.params.appName;
            

        useEffect(()=>{
            axios.get(constants.devServer+"/getDesign/"+props.match.params.appName).then((result)=>{
                appStateData = result.data.map((value) => {
                    return createClassFromConfigurations(value,false);
                }) ;
                setIsAppLoaded(true);
            }).catch((err)=>{
                console.log(err);
            })


        },[])
        
        
        const createAppConfig = () => {
            console.log(appStateData);

        }

        const addState = (state) => {
            appStateData.push(state);
        }


        const savePendingStates = (state) => {
            pendingStates.unshift(state);
        };

        const deleteState = (id) => {
            let toDeleteIndex = null;
            for(let i=0;i<appStateData.length;i++){
                if(appStateData[i].id === id){
                    toDeleteIndex= i;
                    break;
                }
            }
            if(toDeleteIndex !== null) {
                appStateData.splice(toDeleteIndex,1);
            }

            triggerRender(v4());
        }

        return (
            <>
            {(isAppLoaded) ? <Designer 
                    appName={appName}
                    addState={addState} deleteState={deleteState} {...props} 
                    createAppConfig={createAppConfig} pendingStates={pendingStates} 
                    data={appStateData} saveState={savePendingStates}></Designer>:null
            
            }
            </>
            
        );
} 






