import RowComponent from "./RowComponent";
import { userContext } from "./App";
const TableComponent =()=>{

    return (<div>
        <h2>Table component <userContext.Consumer>
            {
                obj=>obj
            }
            </userContext.Consumer></h2>
        <RowComponent/>
    </div>)

}
export default TableComponent;