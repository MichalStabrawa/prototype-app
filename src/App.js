
import './App.css';

import NavComponent from './components/NavComponent/NavComponent';
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import Wrapper from './components/UI/Wrapper/Wrapper';
import BudgetAppComponent from './components/AddSection/BudgetAppComponent';

function App() {
  return (
    <div className="App">
      <NavComponent></NavComponent>
      <Wrapper>
        <HeaderComponent></HeaderComponent>
        <BudgetAppComponent></BudgetAppComponent>
      </Wrapper>

    </div>
  );
}

export default App;
