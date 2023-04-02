import Header from './Header';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="" element={ <Register/>}></Route>
        <Route path="login" element={ <Login/>}></Route>
        <Route path="dashboard" element={ <Dashboard/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
