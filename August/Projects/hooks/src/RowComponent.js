import { userContext } from "./App";

const RowComponent =()=>{

    return(<div>
        <h3>Row Component -
            <userContext.Consumer>
                {
                   (obj)=>{
                    return (<div>
                        <h4>{obj}</h4>
                    </div>)
                   }
                }
            </userContext.Consumer>
             </h3>
    </div>)
}
export default RowComponent;