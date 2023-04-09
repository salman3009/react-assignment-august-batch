import { Component } from "react";


class List extends Component{

    constructor(props){
        super(props);
    }
     
    render(){
        return (<div>
            {this.props.product.map((obj,index)=>{
                return (<div key={index}>
                    <h1>{obj.name}</h1>
                </div>)

            })}
        </div>)
    }
}
export default List;