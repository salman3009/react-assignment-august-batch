import { useReducer } from "react";


const UseReducer = ()=>{

    const initialState = 0;
    const reducer=(state,action)=>{
        switch(action){
            case 'increment':
                return state+1;
            case 'decrement':
                return state-1
            case 'payload':
                return 0
        }
    }

    const [count,dispatch]=useReducer(reducer,initialState);

    return (<div>
           <h2>{count}</h2>
        <button onClick={()=>dispatch('increment')}>Increment</button>
        <button onClick={()=>dispatch('decrement')}>decrement</button>
        <button onClick={()=>dispatch('payload')}>payload</button>
    </div>)
}

export default UseReducer;