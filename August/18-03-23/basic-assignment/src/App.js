import { useState,useRef } from "react";
import Form  from "./Form";
import List from "./List";

const list=[{
       name:'amol', date:new Date()
},{
       name:'sathish',date:new Date()
}];

const App=()=>{

       const [getList,setList] = useState(list);

       const firstDate = useRef(null);
       const SecondDate = useRef(null);

       const appendDetails=(obj)=>{
            setList([...getList,obj]);
       } 

       const calculateDate=()=>{
            let first = new Date(firstDate.current.value);
            let second = new Date(SecondDate.current.value);
            let result = Math.abs(second-first);
            let finalResult = Math.ceil((result/(1000*60*60*24)));
            console.log(finalResult);
       }

       return(<div>
        <Form changeHandler={appendDetails}/>
        <List filterList={getList}/>
        
        {2+2}
        {list.length>0?"yes":"no"}
        {list.length && (<div>
              <h1>Hello world</h1>
        </div>)}
        First Date:<input type="date" ref={firstDate}/>
        second Date:<input type="date" ref={SecondDate}/>
        <button onClick={calculateDate}>Date Function</button>
       </div>)
}
export default App;