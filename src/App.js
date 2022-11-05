
import './App.css';

import NavComponent from './components/NavComponent/NavComponent';
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import Wrapper from './components/UI/Wrapper/Wrapper';
import AddSection from './components/AddSection/AddSection';

function App() {
  return (
    <div className="App">
      <NavComponent></NavComponent>
      <Wrapper>
        <HeaderComponent></HeaderComponent>
        <AddSection></AddSection>
      </Wrapper>

    </div>
  );
}

export default App;
