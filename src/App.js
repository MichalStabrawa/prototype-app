import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  createHashRouter,Routes
} from "react-router-dom";
import NavComponent from "./components/NavComponent/NavComponent";
import Home from "./Pages/home/home";
import Login from "./Pages/loginApp/login";
import Register from "./Pages/registerApp/register";
import FooterAppSection from "./components/FooterAppSection/FooterAppSection";
import RemindLogin from "./Pages/remindLogin/remindLogin";
import AboutUs from "./Pages/about/aboutUs";
import ExchangeRates from "./Pages/exchange/exchange-rates";
import BidAsk from "./Pages/bidask/bidAsk";
import Gold from "./Pages/gold/gold";

import { useSelector, useDispatch } from "react-redux";
import { fetchContent } from "./store/fetchGoldSlice";
import { fetchNbpTableA } from "./store/currencyApiNbp/currencyNbpSlice";

import { RotatingLines } from "react-loader-spinner";
import { multipleCurrencyFetchData } from "./store/currencyApiNbp/multipleCurrencyFetchDataSlice";
import { goldFetch } from "./store/goldApiNbp/goldFetchApiSlice";
import { useEffect, useState } from "react";
import RootLayout from "./Pages/Root";
import ExchangeDetails from "./Pages/exchange/ExchangeDetails/ExchangeDetails";
import BidAskDetails from "./Pages/bidask/BidAskDetails/BidAskDetails";
import ErrorPage from "./Pages/Error/ErrorPage";
import UserPage from "./Pages/user/userPage";



function App() {
  const dispatch = useDispatch();
  const tableKind = useSelector((state) => state.table.table);

  const currency = useSelector((state) => state.currency.data);
  const gold = useSelector((state) => state.goldFetch.data);
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const [flag, setFlag] = useState(false);

  const isLoading = useSelector((state) => state.content.isLoading);

  const handleSend = () => {
    setFlag(!flag);
  };

  const router = createHashRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home />, errorElement: <ErrorPage /> },
        { path: "aboutUs", element: <AboutUs />, errorElement: <ErrorPage /> },
        { path: "login", element: <Login />, errorElement: <ErrorPage /> },
        {
          path: "register",
          element: <Register />,
          errorElement: <ErrorPage />,
        },
        {
          path: "login/remind-login",
          element: <RemindLogin />,
          errorElement: <ErrorPage />,
        },
        {
          path: "exchange",
          element: <ExchangeRates flag={flag} click={handleSend} />,
          errorElement: <ErrorPage />,
        },
        { path: "gold", element: <Gold />, errorElement: <ErrorPage /> },
        {
          path: "/exchange/:id",
          element: <ExchangeDetails />,
        },
        { path: "/bidask", element: <BidAsk /> },
        { path: "/bidask/:id", element: <BidAskDetails /> },
        {
          path: 'user',
          element: <UserPage  isAuthenticated={auth}/>,
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
    dispatch(goldFetch());
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
