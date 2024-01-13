import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import classes from "./BidAskFromToDate.module.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SelectFromToDates from "../../../components/UI/SelectFromToDates/SelectFromToDates";

function BidAskFromToDate({ code, currency }) {
  const dispatch = useDispatch();
  const { data, isLoading, status, error } = useSelector(
    (state) => state.fetchBidAskSingleFromToDate
  );
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  return (
    <div className={classes.main}>
      <Container fluid>
        <Row>
          <Col>
            <h2>
              Select {code}/ {currency} bid&ask rates from dates to dates
            </h2>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}><SelectFromToDates/></Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}
export default BidAskFromToDate;
