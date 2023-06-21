import Sub from "./Sub";

const Display=(props)=>{
     return (<div>
        <h2>Display</h2>
        <Sub child={props.parent}/>
     </div>)
}
export default Display;