import React from 'react';
import Display from './Display';
import axios from 'axios';

class App extends React.Component{

   constructor(props){
      super(props);
      this.state={
         name:'akash',
         todos:[]
      }
      this.onChangeHandler = this.onChangeHandler.bind(this);
   }

   componentDidMount(){
      console.log("initial rendering of api");
      axios.get('https://jsonplaceholder.typicode.com/todos/').then((result)=>{
         this.setState({todos:result.data})
         console.log(result.data);
      })
   }

   componentDidUpdate(){
      console.log("any state changes happen");
   }

   componentWillUnmount(){
      console.log("once you leave the component");
   }
   //  onChangeHandler=(event)=>{
      //arrow method don't have their own this keyword it will borrow from surronding that is class this keyword
   //     this.setState({name:event.target.value})
   //  }

   onChangeHandler(event){
      //normal method will have their own this keyword and they not able to recognized setState in their this keyword. 
      //solution we need to bind this keyword from parent class to this function
      this.setState({name:event.target.value})
   }

  render(){
     return (<div>
        Hello world React
        <input type="text" onChange={this.onChangeHandler}/>
        <Display name={this.state.name}/>
        <br/>
        {
         this.state.todos && this.state.todos.length>0 && this.state.todos.map((res)=>{
             return (<div key={res.id}>
                  <h5>{res.title}</h5>
             </div>)
         })
        }
     </div>)
  }

}

export default App;