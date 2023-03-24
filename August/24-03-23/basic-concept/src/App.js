
import './App.css';
import styled from 'styled-components';
function App() {
  return (
    <div className="App">
      <Wrapper>
        Welcome to Reactjs
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.h1`
  padding: 20px;
  background: green;
  width:200px;
  height:100px;
`;

export default App;
