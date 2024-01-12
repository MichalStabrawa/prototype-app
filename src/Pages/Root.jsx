import { Outlet } from "react-router-dom";
import NavComponent from "../components/NavComponent/NavComponent";
import FooterAppSection from "../components/FooterAppSection/FooterAppSection";
import UserInfo from "../components/UserInfo/UserInfo";
function RootLayout() {
  return (
    <>
      <NavComponent />
      <UserInfo/>
      <Outlet />
      <FooterAppSection />
    </>
  );
}

export default RootLayout;
