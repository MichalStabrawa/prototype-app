// PrivateRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";
import NavComponent from "../components/NavComponent/NavComponent";
import FooterAppSection from "../components/FooterAppSection/FooterAppSection";
import UserPage from "./user/userPage";
const PrivateRoute = ({ element: Element, isAuthenticated, ...rest }) => {
  return (
    <>
      <NavComponent />{" "}
      <Route
        {...rest}
        element={isAuthenticated ? <UserPage/> : <Navigate to="/login" />}
      />
      <FooterAppSection />
    </>
  );
};

export default PrivateRoute;
