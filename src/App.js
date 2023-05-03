
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import NavComponent from './components/NavComponent/NavComponent';
import Home from './Pages/home/home';
import Login from './Pages/loginApp/login';
import Register from './Pages/registerApp/register';

function App() {
  return (
    <div className="App">
      <NavComponent></NavComponent>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>

    </div>
  );
}

export default App;
