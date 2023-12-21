import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Wrapper from "../../../components/UI/Wrapper/Wrapper";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import classes from "./ExchangeDetails.module.scss";

function ExchangeDetails() {
  const params = useParams();
  const currency = useSelector((state) => state.currency.data);
  const status = useSelector((state) => state.currency.status);
  const isLoading = useSelector((state) => state.currency.isLoading);
  const [data, setData] = useState();
  const [key, setKey] = useState("3");

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
    );
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
              </Col>
              <Col>
                <Tabs
                  id="controlled-tab-example"
                  activeKey={key}
                  onSelect={(k) => setKey(k)}
                  className="mb-3"
                >
                  <Tab eventKey="3" title="3D">
                    Tab content for 3
                  </Tab>
                  <Tab eventKey="7" title="7D">
                    Tab content for 7
                  </Tab>
                  <Tab eventKey="14" title="14D">
                    Tab content for 14
                  </Tab>
                </Tabs>
              </Col>
            </Row>
          </Container>
        </main>
      </Wrapper>
    </>
  );
}

export default ExchangeDetails;
