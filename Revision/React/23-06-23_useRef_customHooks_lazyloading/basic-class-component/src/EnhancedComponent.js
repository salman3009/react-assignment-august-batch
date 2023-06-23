import React from 'react';


const EnhancedComponent = (OriginalComponent)=>{

    class NewComponent extends React.Component{

        constructor(props){
            super(props);
            this.state={count:0}
        }
        render(){
           return <OriginalComponent name="suresh" count={this.state.count}/>
        }
      }

         return NewComponent;
}


export default EnhancedComponent;