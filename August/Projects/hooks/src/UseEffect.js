import { useEffect,useState } from "react";


const UseEffect=()=>{
  
    const [getAge,setAge] = useState(0);
    const [getApi,setApi] = useState(false);
    //it will run only one time
    //mainly to initiate api call
    useEffect(()=>{
        alert("it will run only one time");
    },[])


    //it will run whenever there is change in getAge state
    useEffect(()=>{
        alert("whenver there is a change in age");
    },[getAge])


    useEffect(()=>{
       alert("whenever there is a change in state it will call everytime"); 
    })

    const onSubmitHandler=()=>{
        setApi(true); //async code
        alert("checking submit"); //sync code
    }



    return (<div>
        <button onClick={()=>setAge(getAge+1)}>Age</button>
        <button onClick={onSubmitHandler}>submit</button>
    </div>)


}
export default UseEffect;

