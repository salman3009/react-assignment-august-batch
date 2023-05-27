import './App.css';
import  Routes  from './routes/Routes';

import axios from 'axios';

axios.interceptors.request.use((request)=>{
     console.log("api call is going");
    request.headers['auth-token'] = sessionStorage.getItem('auth-token');
     return request;
},(error)=>{
  console.log(error);
  return Promise.reject(error);
})

function App() {
  return (
    <Routes/>
  );
}

export default App;
