import UseEffect from './UseEffect';
import UseReducer from './UseReducer';
import Display from './Display';
import { useState } from 'react';
import React from 'react';

export const UserContext = React.createContext();

function App() {

  const [getEmail,setEmail]= useState('akash@gmail.com');
  return (
    <div className="App">
     {/* <UseEffect/> */}
     {/* <UseReducer/> */}
     <UserContext.Provider value={getEmail}>
      <h1>App component</h1>
     <Display parent={getEmail}/>
     </UserContext.Provider>
    
    </div>
  );
}

export default App;
