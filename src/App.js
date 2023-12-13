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
import { fetchNbpTableA } from "./store/currencyApiNbp/currencyNbpSlice";

import { RotatingLines } from "react-loader-spinner";
import { multipleCurrencyFetchData } from "./store/currencyApiNbp/multipleCurrencyFetchDataSlice";

import { useEffect, useState } from "react";

function App() {
  const dispatch = useDispatch();
  const tableKind = useSelector((state) => state.table.table);

  const currency = useSelector((state) => state.currency.data);
  const [flag, setFlag] = useState(false);
  console.log("Currency!!!!");
  console.log(currency);

  const isLoading = useSelector((state) => state.content.isLoading);
  const error = useSelector((state) => state.content.error);

  const handleSend = () => {
    setFlag(!flag);
  };

  useEffect(() => {
    dispatch(fetchContent());
    dispatch(fetchNbpTableA(tableKind));
  }, [dispatch, tableKind]);

  useEffect(() => {
    dispatch(multipleCurrencyFetchData());
  }, [dispatch]);

  return (
    <div className="App">
      {isLoading && (
        <div className="loader">
          {" "}
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      )}
      <NavComponent></NavComponent>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login/remind-login" element={<RemindLogin />} />
        <Route
          path="/exchange"
          element={<ExchangeRates flag={flag} click={handleSend} />}
        />
      </Routes>
      <FooterAppSection></FooterAppSection>
    </div>
  );
}

export default App;
