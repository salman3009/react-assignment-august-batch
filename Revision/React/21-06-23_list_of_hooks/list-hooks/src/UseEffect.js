import {useEffect, useState} from 'react';
const UseEffect=()=>{

   const[getData,setData] = useState(0);

    useEffect(()=>{
      console.log("page load")
      //any get api we can write it here
    },[])

    useEffect(()=>{
      console.log("whenever state updates happens it will trigger")
    },[getData])

    useEffect(()=>{
          const myTimeout = setTimeout(()=>{
            console.log("it is running")
          },3000)
          //whenever we close the component or leave the component
          return ()=>{
            clearTimeout(myTimeout);
          }
    },[])



    return (<div>
        <h1>UseEffect Example</h1>
        <button onClick={()=>setData(getData+1)}>Add</button>
    </div>)
}
export default UseEffect;