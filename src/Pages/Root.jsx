import { Outlet } from "react-router-dom";
import NavComponent from "../components/NavComponent/NavComponent";
import FooterAppSection from "../components/FooterAppSection/FooterAppSection";

function RootLayout() {
  return (
    <>
      <NavComponent />
      <Outlet />
      <FooterAppSection />
    </>
  );
}

export default RootLayout;
