import { useCallback, useState } from "react";

import Count from "./Count";
const UseCallback=()=>{

    const [getAge,setAge] = useState(0);
    const [getSalary,setSalary] = useState(0);

    const onAgeHandler=useCallback(()=>{
       setAge(getAge+1);
    },[getAge])

    const onSalaryHandler=useCallback(()=>{
        setSalary(getSalary+1);
    },[getSalary])


    return<div>
       <button onClick={onAgeHandler}>Age</button>
       <br/>
       <button onClick={onSalaryHandler}>Salary</button>
       <br/>
       <Count type={"Age"} value={getAge}/>
       <Count type={"salary"} value={getSalary}/>
    </div>
}
export default UseCallback;