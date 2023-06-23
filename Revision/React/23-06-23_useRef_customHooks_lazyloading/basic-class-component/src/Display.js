import React from 'react';

class Display extends React.Component{
   
    constructor(props){
        super(props);
    }

  render(){
     return (<div>
        Hello world Display - {this.props.name}
     </div>)
  }

}

export default Display;