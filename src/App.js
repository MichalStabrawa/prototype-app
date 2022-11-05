
import './App.css';

import NavComponent from './components/NavComponent/NavComponent';
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import Wrapper from './components/UI/Wrapper/Wrapper';

function App() {
  return (
    <div className="App">
      <NavComponent></NavComponent>
      <Wrapper>
        <HeaderComponent></HeaderComponent>
      </Wrapper>

    </div>
  );
}

export default App;
