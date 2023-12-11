import { React, useState, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import Wrapper from "../../UI/Wrapper/Wrapper";
import classes from "../../BudgetApp/BudgetAppExchangeComponent/BudgetAppExchange.module.scss";
import Select from "../../UI/Select/Select";
import InputComponent from "../../UI/Input/InputComponent";
import IconArrow from "../../UI/iconArrow/iconArrow";
import getCurrentDate from "../../../utils/dateFunction";
import fetchNBP from "../../../store/fetchNbpApi";
import fetchCurrentNBP from "../../../store/fetchNbpCurrentApi";
import getCurrentPrevDifferences from "../../../utils/getCurrentPrevDifferences";
import { Link } from "react-router-dom";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import Reducer from "./../../../store/store";
import getCompareLastActualValue from "../../../utils/getCurrentLastValue";
import Button from "../../UI/Button/Button";

import ExchangeMainTable from "../../ExchangeComponents/ExchangeMainTable/ExchangeMainTable";

const { reducerDate, initialDate, fetchNbpTopCountReducer } = Reducer;

const BudgetAppExchange = (props) => {
  const dataCurrencySelector = useSelector((state) => state.currency.data);
  const [data, setData] = useState([]);
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
  }, [dataCurrencySelector]);

  return (
    <Wrapper css={props.css}>
      {isLoading && <p>Is Loading</p>}
      <div className={classes.exchange_item}>
        <div className={classes.exchange_item_current}>
          <span>
            Current NBP {stateDate.currentDate} {getCurrentDate()}
          </span>
          <Select
            name="Count"
            catchValue={addExchangeHandler}
            exchange={data}
          ></Select>
        </div>
        <div>
          {currency.value !== "" && currency.value !== undefined && (
            <div>
              <div>
                <InputComponent
                  name="Count"
                  type="number"
                  value={props.exchangeValue}
                  action={props.addHandlerInput}
                />
                {currency.code} {`(${currency.name})`} to w przeliczeniu
              </div>
              <p className={classes.equal}>
                <span>
                  {`${(+props.exchangeValue * currency.value).toFixed(2)} PLN`}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
      <div className={classes.exchange_item}>
        <p className={classes.exchange_item__paragraph}>
          <span className={classes.last_wrapper}>
            {" "}
            <span className={classes.text_bold}>{exchange[1]?.code}</span>
            {exchange[1]?.value}
          </span>
          <span className={classes.last_date}>{stateDate.currentDate}</span>
          <span
            className={`${classes.last_value} ${
              classes[
                getCurrentPrevDifferences(
                  exchange[1]?.value,
                  exchangeLast[1]?.value
                )
              ]
            }`}
          >
            {(exchange[1]?.value - exchangeLast[1]?.value).toFixed(3)}
          </span>
          <IconArrow
            arrow={getCurrentPrevDifferences(
              exchange[1]?.value,
              exchangeLast[1]?.value
            )}
          />
          <span>{exchangeLast[1]?.value}</span>
          <span className={classes.last_date}>{stateDate.lastDate}</span>
        </p>
        <p className={classes.exchange_item__paragraph}>
          <span className={classes.last_wrapper}>
            {" "}
            <span className={classes.text_bold}>{exchange[7]?.code}</span>
            {exchange[7]?.value}
          </span>
          <span className={classes.last_date}>{stateDate.currentDate}</span>
          <span
            className={`${classes.last_value} ${
              classes[
                getCurrentPrevDifferences(
                  exchange[7]?.value,
                  exchangeLast[7]?.value
                )
              ]
            }`}
          >
            {(exchange[7]?.value - exchangeLast[7]?.value).toFixed(3)}
          </span>
          <IconArrow
            arrow={getCurrentPrevDifferences(
              exchange[7]?.value,
              exchangeLast[7]?.value
            )}
          />
          <span>{exchangeLast[7]?.value}</span>
          <span className={classes.last_date}>{stateDate.lastDate}</span>
        </p>
        <p className={classes.exchange_item__paragraph}>
          <span className={classes.last_wrapper}>
            <span className={classes.text_bold}>{exchange[9]?.code}</span>{" "}
            {exchange[9]?.value}
          </span>
          <span className={classes.last_date}>{stateDate.currentDate}</span>
          <span
            className={`${classes.last_value} ${
              classes[
                getCurrentPrevDifferences(
                  exchange[9]?.value,
                  exchangeLast[9]?.value
                )
              ]
            }`}
          >
            {(exchange[9]?.value - exchangeLast[9]?.value).toFixed(3)}
          </span>
          <IconArrow
            arrow={getCurrentPrevDifferences(
              exchange[9]?.value,
              exchangeLast[9]?.value
            )}
          />
          <span>{exchangeLast[9]?.value}</span>
          <span className={classes.last_date}>{stateDate.lastDate}</span>
        </p>
        <p className={classes.exchange_item__paragraph}>
          <span className={classes.last_wrapper}>
            <span className={classes.text_bold}>{exchange[10]?.code} </span>
            {exchange[10]?.value}
          </span>
          <span className={classes.last_date}>{stateDate.currentDate}</span>
          <span
            className={`${classes.last_value} ${
              classes[
                getCurrentPrevDifferences(
                  exchange[10]?.value,
                  exchangeLast[10]?.value
                )
              ]
            }`}
          >
            {(exchange[10]?.value - exchangeLast[10]?.value).toFixed(3)}
          </span>
          <IconArrow
            arrow={getCurrentPrevDifferences(
              exchange[10]?.value,
              exchangeLast[10]?.value
            )}
          />
          <span>{exchangeLast[10]?.value}</span>
          <span className={classes.last_date}>{stateDate.lastDate}</span>
        </p>
        <ExchangeMainTable />
      </div>
      <div className={classes.chart}>
        <ResponsiveContainer width="100%" height="100%">
          <label>{stateDate.currentDate}</label>
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
            <YAxis />
            <Tooltip dataKey="name" />
            <Legend />
            <Bar dataKey="value" barSize={15} fill="#413ea0" />
            <Line type="monotone" dataKey="value" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className={classes.next}>
        <Link to="/exchange">
          <Button name="more" />
        </Link>
      </div>
    </Wrapper>
  );
};

export default BudgetAppExchange;
