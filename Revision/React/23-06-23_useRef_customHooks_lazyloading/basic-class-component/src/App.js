import React from 'react';
import EnhancedComponent from './EnhancedComponent';
class App extends React.Component{

  render(){
     return <h1>{this.props.name} - {this.props.count}</h1>
  }
}
export default EnhancedComponent(App);