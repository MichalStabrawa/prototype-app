import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import BudgetAppSection from "../../components/BudgetApp/BudgetAppSection/BudgetAppSection";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Wrapper from "../../components/UI/Wrapper/Wrapper";
import classes from "./bidask.module.scss";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { fetchNbpTableC } from "../../store/currencyApiNbp/currencyFetchTableC";
import TableBidAsk from "../../components/UI/TableBidAsk/TableBidAsk";

function BidAsk() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.tableC.data);
  const status = useSelector((state) => state.tableC.status);
  const isLoading = useSelector((state) => state.tableC.isLoading);
  const [selectedItem, setSelectedItem] = useState({
    name: "",
    value: "",
    code: "",
  });
  const [inputValue, setInputValue] = useState(0);
  const [choiceAction, setChoiceAction] = useState(false);

  const handleChange = (e) => {
    const index = e.target.selectedIndex;
    const option = e.target.childNodes[index];
    const name = e.target.name;
    setSelectedItem({
      name: option.getAttribute("data-names"),
      value: e.target.value,
      code: option.getAttribute("data-code"),
    });
  };

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleChoiceAction = () => {
    setChoiceAction(!choiceAction);
    setSelectedItem({
      name: "",
      value: "",
      code: "",
    });
    setInputValue();
  };

  const selectValueBid = () => {
    return data[0].rates.map((el, index) => (
      <option
        value={el.bid}
        key={index}
        data-names={el.currency}
        data-code={el.code}
      >
        {el.code} /{el.currency} {el.bid}
      </option>
    ));
  };

  const selectedValueAsk = () => {
    return data[0].rates.map((el, index) => (
      <option
        value={el.ask}
        key={index}
        data-names={el.currency}
        data-code={el.code}
      >
        {el.code} /{el.currency} {el.ask}
      </option>
    ));
  };

  useEffect(() => {
    dispatch(fetchNbpTableC());
  }, [dispatch]);

  if (isLoading) {
    return "LOADING......";
  }
  console.log(selectedItem);

  return (
    <>
      <Wrapper>
        <header className={classes.header}>
          <h1>Bid & Ask currency</h1>
        </header>
      </Wrapper>
      <Wrapper>
        <main className={classes.main}>
          <Container fluid>
            <Row>
              <Col xs={12} md={6}>
                <h3>Sell or buy currency</h3>
                <Col xs={12} md={6}>
                  <Form.Control
                    onChange={handleInput}
                    type="number"
                    placeholder="count"
                  />
                  {!choiceAction ? (
                    <Form.Select
                      onChange={handleChange}
                      aria-label="Default select example"
                    >
                      <option value="open this select">
                        Open this select menu
                      </option>
                      {status === "success" && selectValueBid()}
                    </Form.Select>
                  ) : (
                    <Form.Select
                      onChange={handleChange}
                      aria-label="Default select example"
                    >
                      <option value="open this select ask">
                        Open this select menu ask
                      </option>
                      {status === "success" && selectedValueAsk()}
                    </Form.Select>
                  )}
                      <div className={classes.count}>{inputValue==0 && selectedItem.value !==''?'0':   (selectedItem.value*inputValue ).toFixed(4)}
              
                  </div>
                  <div className={classes.btn_wrapper}>
                    <Button onClick={handleChoiceAction} variant="secondary">
                      {!choiceAction ? "change to ask" : "change to bid"}
                    </Button>
                  </div>

              
                </Col>
              </Col>
              <Col>{status === "success" && <TableBidAsk data={data} />}</Col>
            </Row>
          </Container>
        </main>
      </Wrapper>
    </>
  );
}

export default BidAsk;
