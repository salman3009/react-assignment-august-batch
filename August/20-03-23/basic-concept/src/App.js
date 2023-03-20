import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';



function App() {

  const[getList,setList]=useState([]);
  const[getLoader,setLoader]=useState(true);
  const[getEven,setEven]=useState(true);
    
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
      setLoader(false);

    }catch(err){
      console.log(err);
    }
       
  }
 

  return (
    <div className="App">
      {getLoader && <h1>Data is loading</h1>}
     {!getLoader &&<div> {getList.map((obj)=>{
        return(<div key={obj.id}>
            <h2>{obj.title}</h2>
            <h3>{obj.body}</h3>
        </div>)
      })}
       Even Number<input type="checkbox" checked={getEven} onChange={()=>setEven(!getEven)}/>
      </div>
      }
    </div>
  );
}

export default App;
