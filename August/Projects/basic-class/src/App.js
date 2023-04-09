import { Component } from "react";
import Form from "./Form";
import List from "./List";


class App extends Component {

  constructor(props){
    super(props)
    this.state={
      productName:''
    }
  }

  render(){
    return (<div>
      <Form/>
      <List/>
    </div>)
  }
}

export default App;