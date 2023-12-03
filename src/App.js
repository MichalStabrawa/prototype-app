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
import fetchGoldSlice from "./store/fetchGoldSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch()

  const contents = useSelector((state) => state.content.contents)
 

  const isLoading = useSelector((state) => state.content.isLoading)
  const error = useSelector((state) => state.content.error)
  useEffect(() => {
    dispatch(fetchContent())
  }, [])

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
