import { useState,useMemo} from "react";
import axios from 'axios';

const UseMemo=()=>{

    const[getSalary,setSalary] = useState(1);
    const[getAge,setAge] = useState(0);

    const expenseCalculationLogic = ()=>{
      console.log("entering inside the business logic");
       let increment = 0;
        for(let i=0;i<getSalary;i++){
          increment +=i;
        }
        console.log(increment);
         if(increment%2 ==0){
            return true;
         }
         else{
            return false;
         }
         
    }

     //const finalSalaryRange = expenseCalculationLogic();
    const finalSalaryRange = useMemo(()=>expenseCalculationLogic(),[getSalary]);

       return(<div>
           <h1>Display Age:{getAge}</h1>
           <button onClick={()=>setAge(getAge+1)}>Increment the Age</button>
           <br/>
           <button onClick={()=>setSalary(getSalary+1)}>Increment the salary by 1000</button>
           <br/>
           <h1>Salary Amount:{finalSalaryRange?"Even":"Odd"}</h1>
       </div>)

}
export default UseMemo;