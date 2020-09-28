import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {ButtonComponent} from './components/buttonComponent';

var Z = 0;

function App() {
  const [elementArray,setElementArray] = useState([]);

  

  return (

    <div>
      <span style={{display:"inline-block", width:"1024px",height:"576px", backgroundColor:"#f0f0f0" }}>
  
        {elementArray.map((element)=>{
          return <ButtonComponent key={element.index}></ButtonComponent>
        })}

      </span>
      <span style={{display:"inline-block", width:"100px",height:"576px",backgroundColor:"black"}}>
        <button onClick={
            (event) => {
              setElementArray((prevElements)=> {
                Z = Z + 1;
                return [...prevElements,{index:Z}]
              });
            }
        } >ADD BUTTON</button>

      </span>
      
    </div>

        
  );
}

export default App;
