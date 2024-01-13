import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import classes from "./BidAskFromToDate.module.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function BidAskFromToDate() {
  const dispatch = useDispatch();
  const { data, isLoading, status, error } = useSelector(
    (state) => state.fetchBidAskSingleFromToDate
  );
  const [startDate,setStartDate] = useState();
  const [endDate,setEndDate]= useState();

  return <div className={classes.main}></div>;
}
