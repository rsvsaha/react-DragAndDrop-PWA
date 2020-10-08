import React from 'react';
import Axios from 'axios';
import { constants } from '../constants';
import './homeComponentStyle.css';

export const HomeComponent = (props) => {

    let appName = "";    



    return(<div className="homeContainer">
        <img src="d&dlogo.png" className="imageStyle"></img>
        <h1>Welcome to Drag and Drop PWA Builder</h1>
        <h3>This is a framework which is can be used to easily build very basic static PWA apps with a drag and drop programming method. You can find the source code <a href="https://github.com/rsvsaha/react-DragAndDrop-PWA" target="_blank">here</a>.</h3>
        
        <h3><u>Enter App Name</u></h3>
        <input className="inputStyle" type="text" defaultValue={appName} onChange={(ev)=>{appName = ev.target.value;}}></input>
        <div className="btnContainer"> <button className="btnStyle" onClick={(ev)=>{

            if(appName !== ""){
                Axios.get(constants.devServer+"/open/"+appName).then((result)=>{
                    props.history.push("/design/"+result.data);
                    window.sessionStorage.setItem('app-name',appName);
                }).catch((err)=>{
                    console.log(err);
                })
            }
            else {
                alert('Enter a valid App Name');
            }
            
        }}>START</button> </div>

    </div>);




}