import { useDispatch } from 'react-redux';
import {increment } from './counterSlice'

const List=()=>{
   const dispatch = useDispatch();

   return (<div>
    List component
    <button onClick={()=>dispatch(increment())}>ADD</button>
   </div>)
}

export default List;