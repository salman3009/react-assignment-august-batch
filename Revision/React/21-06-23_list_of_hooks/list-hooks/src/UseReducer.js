import { useReducer } from "react";

const UseReducer=()=>{

    const initialState = 1;

    const reducer=(state,action)=>{
        switch(action){
            case 'increment':
                return state+1;
            case 'decrement':
                return state-1;
            case 'amount':
                return state+10;
        }

    }

    const [count,dispatch]=  useReducer(reducer,initialState);


     return (<div>
        <h1>{count}</h1>
        <br/>
        <button onClick={()=>dispatch('increment')}>Increment</button>
        <br/>
        <button onClick={()=>dispatch('decrement')}>Decrement</button>
        <br/>
        <button onClick={()=>dispatch('amount')}>Amount</button>
     </div>)
}

export default UseReducer;