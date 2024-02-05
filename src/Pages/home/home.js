import { useEffect, useRef } from "react";
import BudgetAppComponent from "../../components/BudgetApp/BudgetAppComponent/BudgetAppComponent";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import Wrapper from "../../components/UI/Wrapper/Wrapper";

const Home = (props) => {
  const sectionRef = useRef(null);
  const scrollToRef = useRef(null)
  useEffect(() => {
    // Check if there is a hash in the URL and scroll to the section

    if (window.location.hash === "#/#section" && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  return (
    <Wrapper>
      <HeaderComponent scrollToRef={scrollToRef}/>
      <BudgetAppComponent scrollToRef={scrollToRef} sectionRef={sectionRef}></BudgetAppComponent>
    </Wrapper>
  );
};
export default Home;
