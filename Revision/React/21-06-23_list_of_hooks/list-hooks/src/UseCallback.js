import { useState,useCallback} from "react";
import List from './List';
const UseCallback=()=>{

    const[getSalary,setSalary] = useState(1);
    const[getAge,setAge] = useState(0);

    const ageHandler=useCallback(()=>{
        setAge(getAge+1)
    },[getAge]);

    const salaryHandler=useCallback(()=>{
        setSalary(getSalary+1)
    },[getSalary])

       return(<div>
           <List text={'salary'} count={getSalary}/>
           <List text={'age'} count={getAge}/>
           <button onClick={ageHandler}>Increment the Age</button>
           <br/>
           <button onClick={salaryHandler}>Increment the salary by 1000</button>
           <br/>
       </div>)

}
export default UseCallback;