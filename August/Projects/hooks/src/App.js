import './App.css';
import UseEffect from './UseEffect';
import UseRef from './UseRef';
import TableComponent from './TableComponent';
import UseCallback from './UseCallback';
import UseMemo from './UseMemo';
import UseReducer from './UseReducer';
import UseFetch from './UseFetch';
import React, { useState } from 'react';
export const userContext = React.createContext();

function App() {
  const [getName, setName] = useState('akash');

  const list = UseFetch('https://jsonplaceholder.typicode.com/todos/1');
  console.log(list);

  return (
    <div className="App">
      <div>
        {/* <UseEffect/> */}
        {/* <UseRef/> */}
        {/* <userContext.Provider value={getName}>
          <TableComponent />
        </userContext.Provider> */}
        {/* <UseCallback/> */}
        {/* <UseMemo/> */}
        <UseReducer/>
      </div>
    </div>
  );
}

export default App;
