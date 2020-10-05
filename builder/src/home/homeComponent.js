import React from 'react';
import Axios from 'axios';
import { constants } from '../constants';

export const HomeComponent = (props) => {

    var appName="";




    return(<div>
        <div>App Name: <input type="text" defaultValue={appName} onChange={(ev)=>{appName = ev.target.value;}}></input></div>
        <div> <button onClick={(ev)=>{
            Axios.get(constants.devServer+"/open/"+appName).then((result)=>{
                props.history.push("/design/"+result.data);
            }).catch((err)=>{
                console.log(err);
            })
        }}>OPEN</button> </div>

    </div>);




}