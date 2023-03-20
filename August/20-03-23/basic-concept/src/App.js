import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';



function App() {

  const[getList,setList]=useState([]);
    
  console.log("line 1");
  
  useEffect(()=>{
   console.log("line 3");
   initialDetails();
  },[])

  const display=()=>{
    return new Promise((resolve,reject)=>{
            resolve("success");
    })
  }
  display().then((result)=>{
      console.log("line 2");
  })

  const initialDetails= async ()=>{
    try{
      let result = await fetch('https://jsonplaceholder.typicode.com/posts');
      result = await result.json();
      result = result.slice(0,10);
      console.log(result);
      setList(result);

    }catch(err){
      console.log(err);
    }
       
  }
 

  return (
    <div className="App">
      {getList.map((obj)=>{
        return(<div key={obj.id}>
            <h2>{obj.title}</h2>
            <h3>{obj.body}</h3>
        </div>)
      })}
    </div>
  );
}

export default App;
