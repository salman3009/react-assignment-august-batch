import React from "react";

const List=(props)=>{
    console.log(props.text,props.count);
     return (<div>
        <h2>Display - {props.text}</h2>
         <h2>Count - {props.count}</h2>
     </div>)
}
export default React.memo(List);