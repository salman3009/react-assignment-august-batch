
import { UserContext } from "./App";

const Sub=(props)=>{
    return (<div>
        <h3>Sub</h3>
        <UserContext.Consumer>
            {
                (obj)=>{
                    return  <div>Email id - {obj}</div>
                }
            }
        </UserContext.Consumer>
       
     </div>)
}
export default Sub;