import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Wrapper from "../../../components/UI/Wrapper/Wrapper";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from 'react-bootstrap/Spinner';

import classes from "./ExchangeDetails.module.scss";

function ExchangeDetails() {
  const params = useParams();
  const currency = useSelector((state) => state.currency.data);
  const status = useSelector((state) => state.currency.status);
  const isLoading = useSelector((state) => state.currency.isLoading);
  const [data, setData] = useState();

  const filterCurrency = (data) => {
    return data[1].rates.filter((el) => el.code === params.id);
  };

  useEffect(() => {
    if (status === "success") {
      setData(filterCurrency(currency));
    }
  }, [currency]);

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );;
  }

  return (
    <>
      <Wrapper>
        <header>
          {" "}
          <h1>Exchange Details</h1>
        </header>
      </Wrapper>
      <Wrapper css="grid">
        <Container></Container>
        <main className="exchange">
          <Container>
            <Row>
              <Col>
                {" "}
                <Link to="/exchange">
                  {" "}
                  <Button variant="secondary">Back</Button>
                </Link>
              </Col>
            </Row>
            <Row>
              <Col>
                {currency && data && (
                  <div>
                    <h3>{data[0].code}</h3>
                    <p>
                      {data[0].currency} <span>{data[0].mid}</span>
                      <span>date: {currency[1].effectiveDate}</span>
                    </p>
                  </div>
                )}

                <div>
                  <div className="tabulation">
                    <button>5d</button>
                    <button>7d</button>
                    <button>14d</button>
                  </div>
                </div>
              </Col>
              <Col>Test</Col>
            </Row>
          </Container>
        </main>
      </Wrapper>
    </>
  );
}

export default ExchangeDetails;
