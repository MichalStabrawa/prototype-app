import { useState, useEffect } from "react";
import Wrapper from "../../components/UI/Wrapper/Wrapper";
import classes from "./exchange-rates.module.scss";
import { useSelector } from "react-redux";
import BudgetAppSection from "../../components/BudgetApp/BudgetAppSection/BudgetAppSection";

import getCompareLastActualValue from "../../utils/getCurrentLastValue";
import TableRates from "../../components/UI/TableRates/TableRates";

const ExchangeRates = (props) => {
  const currency = useSelector((state) => state.currency.data);
  console.log("CUrrency Page");

  const [compareData, setCompareData] = useState([]);
  const [data, setData] = useState([]);

  console.log("DATA with arrow");
  console.log(data)
  console.log(currency[1].effectiveDate)

  useEffect(() => {
    setCompareData(currency);
  }, [currency]);

  useEffect(() => {
    if (compareData.length > 0) {
      const tab = getCompareLastActualValue(
        currency[1].rates,
        currency[0].rates
      );
      setData(tab);
    }
  }, [compareData, currency]);

  return (
    <Wrapper>
      <header>
        <h1>Exchange Rates</h1>
      </header>
      <div className={classes.exchange_wrapper}>
        <BudgetAppSection>
     <TableRates data={data} effectiveDate={currency[1].effectiveDate} table={currency[1].table}/>
        </BudgetAppSection>
      </div>
    </Wrapper>
  );
};

export default ExchangeRates;
