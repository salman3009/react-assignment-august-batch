import { Component } from "react";
import Form from "./Form";
import List from "./List";
import axios from "axios";

class App extends Component {

  //initialization method
  constructor(props){
   //alert("constructor 1")
    //always pass it so derived class can access props
    super(props)
    //we have only one state in entire class component
    this.state={
      flag:false,
      productName:[]
    }
  }

  componentDidMount(){
    //alert("componentDidMount 3")
    //initial load of the component
    axios.get('http://localhost:3000/list').then((result)=>{
          this.setState({productName:result.data?result.data:[]})
    })
  }

  productUpdateHandler=(input)=>{
    axios.post('http://localhost:3000/list',{name:input}).then(()=>{
      this.setState({productName:[...this.state.productName,input]})
    })
   
  }

  componentDidUpdate(){
   // alert("componentDidUpdate 4")
    //for every state updates
     console.log(this.state.productName);
  }
  

  
  render(){
    //alert("render 2")
    //to render the jsx mandatory to use it
    //we need to use this keyword for all methods and functions
    return (<div>
      <Form updateProduct={this.productUpdateHandler}/>
      <List product={this.state.productName}/>
    </div>)
  }
}

export default App;