import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import RootLayout from "./Pages/Root";

function App() {
  const dispatch = useDispatch();
  const tableKind = useSelector((state) => state.table.table);

  const currency = useSelector((state) => state.currency.data);
  const [flag, setFlag] = useState(false);

  const isLoading = useSelector((state) => state.content.isLoading);

  const handleSend = () => {
    setFlag(!flag);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/aboutUs", element: <AboutUs /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/login/remind-login", element: <RemindLogin /> },
        {
          path: "/exchange",
          element: <ExchangeRates flag={flag} click={handleSend} />,
        },
      ],
    },
  ]);

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

      <RouterProvider router={router} />
    </div>
  );
}

export default App;
