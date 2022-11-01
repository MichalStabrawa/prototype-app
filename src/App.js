import logo from './logo.svg';
import './App.css';
import Wrapper from './components/UI/Wrapper';
import NavComponent from './components/NavComponent/NavComponent';

function App() {
  return (
    <div className="App">
      <NavComponent></NavComponent>
      <header className="App-header">


        <Wrapper><h2>Test</h2></Wrapper>
      </header>
    </div>
  );
}

export default App;
