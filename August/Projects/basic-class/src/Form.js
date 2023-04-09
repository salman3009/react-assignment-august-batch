import { Component } from "react";


class Form extends Component{

    constructor(props){
       super(props)
       this.state={
        name:''
       }
    }

    componentDidUpdate(){
         console.log(this.state.name);
    }
     
    render(){
        return (<div>
            <input type="text" onChange={(event)=>this.setState({name:event.target.value})}/>
            <button onClick={()=>this.props.updateProduct(this.state.name)}>Submit</button>
        </div>)
    }
}
export default Form;