import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./CompareGoldPricesByDate.module.scss";
import { goldFetchDate } from "../../store/goldApiNbp/goldFetchDateSlice";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";

const CompareGoldPricesByDate = () => {
  const dispatch = useDispatch();
  const gold = useSelector((state) => state.goldFetch.data);
  const status = useSelector((state) => state.goldFetch.status);
  const isLoading = useSelector((state) => state.goldFetch.isLoading);
  const goldDate = useSelector((state) => state.goldFetchDate.data);
  const statusGoldDate = useSelector((state) => state.goldFetchDate.status);
  const error = useSelector((state) => state.goldFetchDate.error);
  const [lastDate, setLastDate] = useState("");
  const [compareData, setCompareData] = useState();

  const handleInputValue = (e) => {
    setLastDate(e.target.value);
  };

  console.log(compareData);
  useEffect(() => {
    if (status === "success" && gold) {
      setCompareData({
        value: gold[1].cena,
        selected_value: gold[0].cena,
        lastDate: gold[0].data,
        currentlyDate: gold[1].data,
        name: "Currently gold value and selected value",
      });
    }
  }, [gold, lastDate]);

  useEffect(() => {
    if (lastDate !== "") {
      dispatch(goldFetchDate({ date: lastDate }));
    }
  }, [dispatch, lastDate]);

  return (
    <div className={classes.compare}>
      <Form.Control type="date" onChange={handleInputValue}></Form.Control>
      <Form.Label>
        <span className={classes.label}>
          Select a date and check the value.
        </span>
      </Form.Label>
      {statusGoldDate === "error" && (
        <Alert variant="warning">Error fetch data</Alert>
      )}
   
        {statusGoldDate === "success" && status ==="success"&&(
          <div className={classes.table_min_max}>
            {" "}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>current value</th>
                  <th>date</th>
                  <th>selected value</th>
                  <th>selected date</th>
                  <th>amount</th>
                  <th>%</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={classes.min}> {gold[1].cena}</td>
                  <td className={classes.date_min_max}>{gold[1].data}</td>
                  <td className={classes.max}>{goldDate[0].cena}</td>
                  <td className={classes.date_min_max}>{goldDate[0].data}</td>
                  <td>{(gold[1].cena-goldDate[0].cena).toFixed(4)}</td>
                  <td>{((((100*gold[1].cena)/goldDate[0].cena))-100).toFixed(4)+"%"}</td>
                </tr>
              </tbody>
            </Table>
            <label>Gold price = PLN/1g</label>
          </div>
        )}
    
    </div>
  );
};

export default CompareGoldPricesByDate;
