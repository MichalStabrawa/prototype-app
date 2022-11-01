import logo from './logo.svg';
import './App.css';
import Wrapper from './components/UI/Wrapper';
import NavComponent from './components/NavComponent/NavComponent';

function App() {
  return (
    <div className="App">
      <NavComponent></NavComponent>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <Wrapper><h2>Test</h2></Wrapper>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
