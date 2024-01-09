import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import classes from "./ExchangeDetSearchDate.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import { RotatingLines } from "react-loader-spinner";

import { singleCurrencyDateFetch } from "../../../store/currencyApiNbp/singleCurrencyFetchDateSlice";
import getCurrentPrevDifferences from "../../../utils/getCurrentPrevDifferences";

function ExchangeDetSearchDate({ data, currency }) {
  const dispatch = useDispatch();
  const fetchData = useSelector((state) => state.singleCurrency.data);
  const isLoading = useSelector((state) => state.singleCurrency.isLoading);
  const status = useSelector((state) => state.singleCurrency.status);
  const error = useSelector((state) => state.singleCurrency.error);
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
              Select a date and check the value: {data && data[0].code}{" "}
              {data && data[0].currency}
            </span>
          </Form.Label>
          {status === "error" && lastDate  && (
            <Alert variant="danger">
              Error fetch data selected: {lastDate}
            </Alert>
          )}
        </Col>
        <Col>
          <div className={classes.table}>
            {isLoading && (
              <div className={classes.loader}>
                {" "}
                <RotatingLines
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="96"
                  visible={true}
                />
              </div>
            )}
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
                  <td className={classes.value}>{data[0].mid} </td>
                  {/* <td className={classes.date}>{gold[1].data}</td> */}
                  <td className={classes.rate}>{currency[1].effectiveDate}</td>

                  <td className={classes.value}>
                    {status === "success" && fetchData.rates[0].mid}
                  </td>
                  <td className={classes.rate}>{lastDate}</td>
                  <td
                    className={
                      status === "success" &&
                      `${classes.rate} ${
                        classes[
                          getCurrentPrevDifferences(
                            data[0].mid,
                            fetchData.rates[0].mid
                          )
                        ]
                      }`
                    }
                  >
                    {status === "success" &&
                      (data[0].mid - fetchData.rates[0].mid).toFixed(4)}
                  </td>
                  <td
                    className={
                      status === "success" &&
                      `${classes.rate} ${
                        classes[
                          getCurrentPrevDifferences(
                            data[0].mid,
                            fetchData.rates[0].mid
                          )
                        ]
                      }`
                    }
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
            <label className={classes.rate}>
              selected date: {lastDate}, selected code: {data && data[0].code},
              selected currency: {data && data[0].currency}
            </label>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ExchangeDetSearchDate;
