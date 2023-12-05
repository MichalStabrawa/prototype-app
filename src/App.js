import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavComponent from "./components/NavComponent/NavComponent";
import Home from "./Pages/home/home";
import Login from "./Pages/loginApp/login";
import Register from "./Pages/registerApp/register";
import FooterAppSection from "./components/FooterAppSection/FooterAppSection";
import RemindLogin from "./Pages/remindLogin/remindLogin";
import AboutUs from "./Pages/about/aboutUs";
import ExchangeRates from "./Pages/exchange/exchange-rates";
import { useSelector, useDispatch } from "react-redux";
import { fetchContent } from "./store/fetchGoldSlice";
import {fetchNbpTableA} from "./store/currencyApiNbp/currencyNbpSlice"
import authSlice from'./store/auth';

import { useEffect } from "react";

function App() {
  const dispatch = useDispatch()

  const contents = useSelector((state) => state.content.contents);
const auth = useSelector(state=>state.isAuthenticated)
const currency = useSelector(state=> state.currency.data)

console.log('Currency!!!!');
console.log(currency)
 

  const isLoading = useSelector((state) => state.content.isLoading)
  const error = useSelector((state) => state.content.error)
  useEffect(() => {
    dispatch(fetchContent())
    dispatch(fetchNbpTableA())
  }, [dispatch])

  if (isLoading) {
    return 'loading...'
  }

  if (error) {
    return error
  }

  console.log('CONTENTS')
  console.log(contents)

  return (
    <div className="App">
      <NavComponent></NavComponent>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login/remind-login" element={<RemindLogin />} />
        <Route path="/exchange" element={<ExchangeRates />} />
      </Routes>
      <FooterAppSection></FooterAppSection>
    </div>
  );
}

export default App;
