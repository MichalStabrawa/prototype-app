import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import BudgetAppSection from "../../components/BudgetApp/BudgetAppSection/BudgetAppSection";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Wrapper from "../../components/UI/Wrapper/Wrapper";
import classes from "./bidask.module.scss";
import InputComponent from "../../components/UI/Input/InputComponent";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button'
import { fetchNbpTableC } from "../../store/currencyApiNbp/currencyFetchTableC";

function BidAsk() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.tableC.data);
  const status = useSelector((state) => state.tableC.status);
  const isLoading = useSelector((state) => state.tableC.isLoading);

  console.log(data);
  useEffect(() => {
    dispatch(fetchNbpTableC());
  }, [dispatch]);

  if (isLoading) {
    return "LOADING......";
  }

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
              <Col>
                <h3>Sell or buy currency</h3>
                <Col md={6}>
                  <Form.Control type="number" placeholder="count" />
                  <Form.Select aria-label="Default select example">
                    <option>Open this select menu</option>
                    {data[0].rates.map((el, index) => (
                      <option
                        value={el.bid}
                        key={index}
                        data-names={el.currency}
                        data-code={el.code}
                      >
                        {el.code} /{el.currency}
                      </option>
                    ))}
                  </Form.Select>
                  <Button variant="secondary">ask >></Button>
                </Col>
              </Col>
              <Col>
                <h3>Table {status === "success" && data[0].table}</h3>
              </Col>
            </Row>
          </Container>
        </main>
      </Wrapper>
    </>
  );
}

export default BidAsk;
