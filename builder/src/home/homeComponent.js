import React from 'react';
import Axios from 'axios';
import { constants } from '../constants';

export const HomeComponent = (props) => {

    let appName = "";    



    return(<div>
        <div>App Name: <input type="text" defaultValue={appName} onChange={(ev)=>{appName = ev.target.value;}}></input></div>
        <div> <button onClick={(ev)=>{
            Axios.get(constants.devServer+"/open/"+appName).then((result)=>{
                props.history.push("/design/"+result.data);
                window.sessionStorage.setItem('app-name',appName);
            }).catch((err)=>{
                console.log(err);
            })
        }}>OPEN</button> </div>

    </div>);




}