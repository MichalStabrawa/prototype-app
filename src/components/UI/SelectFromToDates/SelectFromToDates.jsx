import classes from "./SelectFromToDates.module.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function SelectFromToDates({ change, fetch, startDate, endDate }) {
  return (
    <div className={classes.compare}>
      <Form.Group>
        <Form.Label>
          {" "}
          <span className={classes.label}>From Date</span>
        </Form.Label>
        <Form.Control
          onChange={change}
          type="date"
          name="startDate"
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>
          {" "}
          <span className={classes.label}>To Date</span>
        </Form.Label>
        <Form.Control
          onChange={change}
          type="date"
          name="endDate"
        ></Form.Control>
      </Form.Group>
      <div className={classes.btn_wrapper}>
        {" "}
        <Button
          onClick={fetch}
          variant="outline-warning"
          disabled={startDate === "" && endDate === ""}
        >
          check it
        </Button>
      </div>
    </div>
  );
}

export default SelectFromToDates;
