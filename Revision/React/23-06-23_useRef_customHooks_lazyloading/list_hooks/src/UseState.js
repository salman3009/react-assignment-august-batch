import Display from './Display';
import {useState} from 'react';

const UseState =()=>{
    const [getName,setName] = useState('');

    const changeHandler=(event)=>{
        setName(event.target.value)
    }
   return (<div>
       welcome to UseState
       <Display/>
       <input type="text" onChange={changeHandler}/>
       <br/>
       <h2>{getName}</h2>

   </div>)
}
export default UseState;