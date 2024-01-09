import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import classes from "./ExchangeDetSearchDate.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

import { singleCurrencyDateFetch } from "../../../store/currencyApiNbp/singleCurrencyFetchDateSlice";
import getCurrentPrevDifferences from "../../../utils/getCurrentPrevDifferences";

function ExchangeDetSearchDate({ data, currency }) {
  const dispatch = useDispatch();
  const fetchData = useSelector((state) => state.singleCurrency.data);
  const isLoading = useSelector((state) => state.singleCurrency.isLoading);
  const status = useSelector((state) => state.singleCurrency.status);
  const [lastDate, setLastDate] = useState();

  const handleInputDate = (e) => {
    setLastDate(e.target.value);
  };

  console.log("DATA TABLE");
  console.log(data);
  console.log(currency);

  useEffect(() => {
    if (data && currency)
      dispatch(
        singleCurrencyDateFetch({
          table: currency[1].table,
          code: data[0].code,
          date: lastDate,
        })
      );
  }, [lastDate, dispatch, currency, data]);
  return (
    <div className={classes.details_wrapper}>
      <Row>
        <Col>
          <h2 className={classes.title}>
            Search currency to date for {data[0].code} {data[0].currency}
          </h2>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={3}>
          <Form.Control
            style={{ width: "100%" }}
            type="date"
            onChange={handleInputDate}
          ></Form.Control>
          <Form.Label>
            <span className={classes.label}>
              Select a date and check the value.
            </span>
          </Form.Label>
        </Col>
        <Col>
          <div className={classes.table}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>current value</th>
                  <th>date</th>
                  <th>selected date</th>
                  <th>selected value</th>

                  <th>amount</th>
                  <th>%</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={classes.value}>{data[0].mid} </td>
                  {/* <td className={classes.date}>{gold[1].data}</td> */}
                  <td className={classes.value}>{currency[1].effectiveDate}</td>
                  <td className={classes.date}>{lastDate}</td>
                  <td className={classes.date}>
                    {status === "success" && fetchData.rates[0].mid}
                  </td>
                  <td
                    className={`${
                      classes[
                        `${
                          status === "succes" &&
                          getCurrentPrevDifferences(
                            data[0].mid,
                            fetchData.rates[0].mid
                          )
                        }`
                      ]
                    }`}
                  >
                    {status === "success" &&
                      (data[0].mid, fetchData.rates[0].mid).toFixed(4)}
                  </td>
                  <td
                    className={`${
                      classes[
                        `${
                          status === "succes" &&
                          getCurrentPrevDifferences(
                            data[0].mid,
                            fetchData.rates[0].mid
                          )
                        }`
                      ]
                    }`}
                  >
                    {status === "success" &&
                      (
                        (100 * data[0].mid) / fetchData.rates[0].mid -
                        100
                      ).toFixed(4) + "%"}
                  </td>
                </tr>
              </tbody>
            </Table>
            <label>Last selected date {lastDate}</label>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ExchangeDetSearchDate;
