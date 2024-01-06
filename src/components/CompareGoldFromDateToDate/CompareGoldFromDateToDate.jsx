import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./CompareGoldFromDateToDate.module.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { goldFetchFromToDate } from "../../store/goldApiNbp/goldFetchFromToDateSlice";

const CompareGoldFromDateToDate = () => {
  const dispatch = useDispatch();
  const goldFromToDate = useSelector((state) => state.goldFetchFromToDate.data);
  const isLoading = useSelector((state) => state.goldFetchFromToDate.isLoading);
  const status = useSelector((state) => state.goldFetchFromToDate.status);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [fetch, setFetch] = useState(false);

  const handleInput = (event) => {
    event.preventDefault();
    if (event.target.name === "fromDate") {
      setFromDate(event.target.value);
    }

    if (event.target.name === "toDate") {
      setToDate(event.target.value);
    }
  };

  const handleFetch = () => {
    setFetch(true);
  };

  useEffect(() => {
    if (fromDate !== "" && toDate !== "") {
      dispatch(goldFetchFromToDate({ fromDate: fromDate, toDate: toDate }));
    }
  }, [dispatch, fetch]);

  return (
    <div className={classes.compare}>
      <Form.Group>
        <Form.Label>
          {" "}
          <span className={classes.label}>From Date</span>
        </Form.Label>
        <Form.Control
          onChange={handleInput}
          type="date"
          name="fromDate"
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>
          {" "}
          <span className={classes.label}>To Date</span>
        </Form.Label>
        <Form.Control
          onChange={handleInput}
          type="date"
          name="toDate"
        ></Form.Control>
      </Form.Group>
      <div className={classes.btn_wrapper}>
        {" "}
        <Button
          onClick={handleFetch}
          variant="outline-warning"
          disabled={fromDate === "" && toDate === ""}
        >
          check it
        </Button>
      </div>
    </div>
  );
};

export default CompareGoldFromDateToDate;
