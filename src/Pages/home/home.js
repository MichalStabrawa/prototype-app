import BudgetAppComponent from "../../components/BudgetApp/BudgetAppComponent/BudgetAppComponent";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import Wrapper from "../../components/UI/Wrapper/Wrapper";

const Home = (props) => {
    return (
        <Wrapper>
            <HeaderComponent></HeaderComponent>
            <BudgetAppComponent></BudgetAppComponent>
        </Wrapper>
    )
}
export default Home;