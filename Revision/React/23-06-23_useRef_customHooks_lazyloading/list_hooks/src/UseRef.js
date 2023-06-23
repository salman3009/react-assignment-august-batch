import Display from './Display';
import {useEffect, useRef} from 'react';

const UseRef =()=>{

    const nameRef = useRef(null);

    useEffect(()=>{
        nameRef.current.value="details";
        nameRef.current.focus();
        nameRef.current.id = "fullName";
        //nameRef.current.disabled = true;

    },[])

    const changeHandler=(event)=>{
        nameRef.current.value=event.target.value;
        console.log(nameRef.current.value);
    }
    const submitHandler=()=>{
        let obj={
            name:nameRef.current.value
        }
        console.log(obj);
    }
   return (<div>
       welcome to UseRef
       <Display/>
       <input type="text" ref={nameRef} onChange={changeHandler}/>
       <br/>
       <button onClick={submitHandler}>Submit</button>
       <h2>{nameRef && nameRef.current && nameRef.current.value}</h2>

   </div>)
}
export default UseRef;