import logo from './logo.svg';
import './App.css';
//https://styled-components.com/docs/basics
import styled from "styled-components";
function App() {
  return (
    <div className="App">
      <Wrapper>
        <Title>
          <h1>Hello World!</h1>
          <Input defaultValue="@probablyup" type="text" />
    <Input defaultValue="@geelen" type="text" inputColor="red" />
        </Title>
      </Wrapper>
    </div>
  );
}

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
  &:hover{
    color: var(--blue)
  }
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: ${props => props.inputColor || "green"};
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

export default App;
