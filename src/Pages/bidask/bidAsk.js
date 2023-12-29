import BudgetAppSection from "../../components/BudgetApp/BudgetAppSection/BudgetAppSection";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Wrapper from "../../components/UI/Wrapper/Wrapper";
import classes from "./bidask.module.scss";

function BidAsk() {
  return (
    <Wrapper>
      <header className={classes.header}>
        <h1>Bid & Ask currency</h1>
      </header>
      <main className={classes}>
        <BudgetAppSection title="Sell ​​or buy currencies"></BudgetAppSection>
      </main>
    </Wrapper>
  );
}

export default BidAsk;
