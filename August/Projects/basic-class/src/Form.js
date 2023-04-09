import { Component } from "react";


class Form extends Component{

    constructor(props){
       super(props)
       this.state={
        name:''
       }
    }
     
    render(){
        return (<div>
            <input type="text" onChange={(event)=>this.setState({name:event.target.value})}/>
            <button>Submit</button>
        </div>)
    }
}
export default Form;