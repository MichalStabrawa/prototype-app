import { useState, useEffect } from "react";
import classes from "./CompareGoldFromDateToDate.module.scss";
import Form from "react-bootstrap/Form";

const CompareGoldFromDateToDate = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleInput = (event) => {
    event.preventDefault();
    if (event.target.name === "fromDate") {
      setFromDate(event.target.value);
    }

    if (event.target.name === "toDate") {
      setToDate(event.target.value);
    }
  };

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
    </div>
  );
};

export default CompareGoldFromDateToDate;
