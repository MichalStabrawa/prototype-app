import { React, useState, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import Wrapper from "../../UI/Wrapper/Wrapper";
import classes from "../../BudgetApp/BudgetAppExchangeComponent/BudgetAppExchange.module.scss";
import Select from "../../UI/Select/Select";
import InputComponent from "../../UI/Input/InputComponent";
import getCurrentDate from "../../../utils/dateFunction";
import fetchNBP from "../../../store/fetchNbpApi";
import fetchCurrentNBP from "../../../store/fetchNbpCurrentApi";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { Link } from "react-router-dom";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import Reducer from "../../../store/store";
import getCompareLastActualValue from "../../../utils/getCurrentLastValue";

import ExchangeMainTable from "../../ExchangeComponents/ExchangeMainTable/ExchangeMainTable";
import ExchangeTableMidValue from "../../ExchangeComponents/ExchangeTableMidValue/ExchangeTableMidValue";

const { reducerDate, initialDate, fetchNbpTopCountReducer } = Reducer;

const BudgetAppExchange = (props) => {
  const dataCurrencySelector = useSelector((state) => state.currency.data);
  const status = useSelector((state) => state.currency.status);
  const table = useSelector((state) => state.table.table);
  const [data, setData] = useState(null);
  const [stateDate, dispatchDate] = useReducer(reducerDate, initialDate);
  const [currency, setCurrency] = useState([]);
  const [exchange, setExchange] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoadingLast, setIsLoadingLast] = useState(false);
  const [exchangeLast, setExchangeLast] = useState([]);
  const [errorLast, setErrorLast] = useState(null);
  const [nbpTopCountData, dispatchNbpTopCountData] = useReducer(
    fetchNbpTopCountReducer,
    []
  );

  useEffect(() => {
    fetchCurrentNBP(
      setIsLoading,
      setError,
      setExchange,
      dispatchDate,
      dispatchNbpTopCountData
    );
  }, []);

  useEffect(() => {
    fetchNBP(setIsLoadingLast, setErrorLast, setExchangeLast, dispatchDate);
  }, []);

  const addExchangeHandler = (e) => {
    const index = e.target.selectedIndex;
    const option = e.target.childNodes[index];

    setCurrency({
      name: option.getAttribute("data-names"),
      value: e.target.value,
      code: option.getAttribute("data-code"),
    });
  };

  useEffect(() => {
    if (dataCurrencySelector.length) {
      const tab = getCompareLastActualValue(
        dataCurrencySelector[1].rates,
        dataCurrencySelector[0].rates
      );
      setData(tab);
    }
  }, [table, dataCurrencySelector]);

  return (
    <Wrapper css={props.css}>
      {isLoading && <p>Is Loading</p>}
      <div className={classes.exchange_item}>
        <div className={classes.exchange_item_current}></div>
        <div>
          <Card className="mb-2" border='light'>
            <Card.Header>
              <span className={classes.card_header}>
                <span>Table: {table}</span>
                <span>
                  no: {status === "success" && dataCurrencySelector[1].no}
                </span>
              </span>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                {" "}
                <span>
                  Current NBP:{stateDate.currentDate},current date:{" "}
                  {getCurrentDate()}
                </span>
              </Card.Text>
              <Select
                name="Count"
                catchValue={addExchangeHandler}
                exchange={data}
              ></Select>
              <InputComponent
                name="Count"
                type="number"
                value={props.exchangeValue}
                action={props.addHandlerInput}
              />
              <Card.Text>
                {currency.value !== "" &&
                  currency.value !== undefined &&
                  `${currency.code} (${currency.name}) to w przeliczeniu`}
              </Card.Text>
              <Card.Text>
                {" "}
                <span className={classes.equal}>
                  <span>
                    {currency.value !== "" &&
                      currency.value !== undefined &&
                      `${(+props.exchangeValue * currency.value).toFixed(
                        2
                      )} PLN`}
                  </span>
                </span>{" "}
              </Card.Text>
            </Card.Body>{" "}
          </Card>
        </div>
      </div>
      <div className={classes.exchange_item}>
        {false && <ExchangeMainTable />}
        <ExchangeTableMidValue dataMid={data} />
        {status === "success" && (
          <p>{`effectiveDate: ${dataCurrencySelector[1].effectiveDate}, no:  ${dataCurrencySelector[1].no}`}</p>
        )}
      </div>
      <div className={classes.chart}>
        <ResponsiveContainer width="100%" height="100%">
          {status === "success" && (
            <label>{`effectiveDate: ${dataCurrencySelector[1].effectiveDate}, no:  ${dataCurrencySelector[1].no}`}</label>
          )}

          <ComposedChart
            width={300}
            height={300}
            data={nbpTopCountData.data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="code" scale="band" />
            <YAxis domain={"dataMin"} />
            <Tooltip dataKey="name" />
            <Legend />
            <Bar dataKey="value" barSize={25} fill="#756AB6" />
            <Line type="monotone" dataKey="value" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className={classes.next}>
        <Link to="exchange">
          <Button variant="outline-secondary">More...</Button>
        </Link>
      </div>
    </Wrapper>
  );
};

export default BudgetAppExchange;