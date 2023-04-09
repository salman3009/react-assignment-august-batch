import { Component } from "react";
import Form from "./Form";
import List from "./List";


class App extends Component {

  constructor(props){
    super(props)
    this.state={
      flag:false,
      productName:[]
    }
  }

  productUpdateHandler=(input)=>{
    this.setState({productName:[...this.state.productName,input]})
  }

  componentDidUpdate(){
     console.log(this.state.productName);
  }
  

  render(){
    return (<div>
      <Form updateProduct={this.productUpdateHandler}/>
      <List/>
    </div>)
  }
}

export default App;