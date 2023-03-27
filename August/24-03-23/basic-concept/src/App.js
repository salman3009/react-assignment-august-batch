
import './App.css';
import styled from 'styled-components';
function App() {
  return (
    <div className="App">
      <Wrapper>
        Welcome to Reactjs
      </Wrapper>
      <Button primary="yes" primaryBackground="yes">Submit</Button>
      <Button primary="no" primaryBackground="yes">Save</Button>
    </div>
  );
}
const Button = styled.button`
  background: ${props => props.primary === "yes" ? "blue" : "green"};
  color: ${props => props.primaryBackground === "no" ? "yellow" : "black"};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const Wrapper = styled.h1`
  padding: 20px;
  background: green;
  width:200px;
  height:100px;
`;

export default App;
