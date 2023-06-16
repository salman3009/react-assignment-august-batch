import './App.css';
import { useSelector,useDispatch } from 'react-redux';
import { increment ,incrementByAmount} from './counterSlice'
import { register,fetchDetails} from './loginSlice'
import { useEffect } from 'react';




function App() {


  useEffect(()=>{
   dispatch(fetchDetails());
  },[])

  const dispatch = useDispatch();
  const {value} = useSelector((state) => state.counter)
  const {email} = useSelector((state) => state.login)
  const {status} = useSelector((state) => state.login)

  const onChangeHandler=(event)=>{
    dispatch(register({email:event.target.value}))
  }

  return (
    <div className="App">
      <h1>
        {status}
      </h1>
      <h2>
        {email}
      </h2>
      <div>
      <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(incrementByAmount(200))}
        >
          Amount
        </button>
        <br/>
         <input type="text" onChange={onChangeHandler}/>
      </div>
    </div>
  );
}

export default App;
