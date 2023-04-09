import React from "react";

const Count=(props)=>{
    console.log(props.type);
    return<div>
       <h1>{props.type}-{props.value}</h1>
    </div>
}
export default React.memo(Count);