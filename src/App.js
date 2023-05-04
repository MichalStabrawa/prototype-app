
import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavComponent from './components/NavComponent/NavComponent';
import Home from './Pages/home/home';
import Login from './Pages/loginApp/login';
import Register from './Pages/registerApp/register';
import FooterAppSection from './components/FooterAppSection/FooterAppSection';
import RemindLogin from './Pages/remindLogin/remindLogin';

function App() {
  return (
    <div className="App">
      <NavComponent></NavComponent>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login/remind-login' element={<RemindLogin />} />
      </Routes>
      <FooterAppSection></FooterAppSection>

    </div>
  );
}

export default App;
