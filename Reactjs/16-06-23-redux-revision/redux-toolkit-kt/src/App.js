import logo from './logo.svg';
import './App.css';
import { useSelector } from 'react-redux'

function App() {

  const {value} = useSelector((state) => state.counter)
  const {email} = useSelector((state) => state.login)

  return (
    <div className="App">
      <h1>
        {value}
      </h1>
      <h2>
        {email}
      </h2>
    </div>
  );
}

export default App;
