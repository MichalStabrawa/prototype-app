import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import classes from "./CalculateGoldComponent.module.scss";

const CalculateGoldComponent = () => {
  const gold = useSelector((state) => state.goldFetch.data);
  const status = useSelector((state) => state.goldFetch.status);
  const isLoading = useSelector((state) => state.goldFetch.isLoading);
  const [inputValue, setInputValue] = useState("");

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <div className={classes.calculate}>
      <Form.Control type="number" onChange={handleInputValue} placeholder="0" />
      <Form.Label column>
        <span className={classes.label}>
          {" "}
          * 1 unit=1g.{" "}
          {status === "success" &&
            `Current gold value ${gold[1].cena}g/PLN, current gold date ${gold[1].data},`}
        </span>
      </Form.Label>
      <div className={classes.count}>
        {inputValue === ""
          ? "0"
          : (gold[1].cena * inputValue).toFixed(4) + " " + "PLN"}
      </div>
    </div>
  );
};

export default CalculateGoldComponent;
