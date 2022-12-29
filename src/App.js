
import './App.css';

import NavComponent from './components/NavComponent/NavComponent';
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import Wrapper from './components/UI/Wrapper/Wrapper';
import BudgetAppComponent from './components/BudgetApp/BudgetAppComponent/BudgetAppComponent';
import FooterAppSection from './components/FooterAppSection/FooterAppSection'

function App() {
  return (
    <div className="App">
      <NavComponent></NavComponent>
      <Wrapper>
        <HeaderComponent></HeaderComponent>
        <BudgetAppComponent></BudgetAppComponent>
      </Wrapper>
      <FooterAppSection></FooterAppSection>
    </div>
  );
}

export default App;
