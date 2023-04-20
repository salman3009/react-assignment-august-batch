import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {

  const [getList, setList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/product').then((response) => {
      console.log(response.data);
      setList(response.data.list);
    })
  }, [])
  return (
    <div className="App">
      <h1>Application running</h1>
      <ul>
        {getList.map((obj, index) => {
          return ( <span key={index}>
            <li >
              {obj.id}
            </li>
            <li >
              {obj.name}
            </li>
            <li >
              {obj.price}
            </li>
          </span>)
         
        })}
      </ul>
    </div>
  );
}

export default App;
