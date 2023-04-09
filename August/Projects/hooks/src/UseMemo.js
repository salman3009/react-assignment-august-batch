import { useMemo, useState } from "react";


const UseMemo=()=>{

    const [getAge,setAge] = useState(0);
    const [getSalary,setSalary] = useState(0);

    const expenseCalculation=()=>{
        for(let i=0;i<10;i++){
            console.log(i);
        }
    }

    // const Event = expenseCalculation();
    const Event = useMemo(()=>expenseCalculation(),[getSalary]);

    return(<div>
        <button onClick={()=>setAge(getAge+1)}>Age</button>
        <button onClick={()=>setSalary(getSalary+1)}>salary</button>
        <h3>Age-{getAge}</h3>
        <h3>Salary-{getSalary}</h3>
        <h4>{Event}</h4>
    </div>)
}
export default UseMemo;