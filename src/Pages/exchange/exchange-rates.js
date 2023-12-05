import { useState, useEffect } from "react";
import Wrapper from "../../components/UI/Wrapper/Wrapper";
import classes from "./exchange-rates.module.scss";
import { useSelector } from "react-redux";
import BudgetAppSection from "../../components/BudgetApp/BudgetAppSection/BudgetAppSection";

import getCompareLastActualValue from "../../utils/getCurrentLastValue";
import TableRates from "../../components/UI/TableRates/TableRates";

const ExchangeRates = (props) => {
  const currency = useSelector((state) => state.currency.data);

  const [compareData, setCompareData] = useState([]);
  const [data, setData] = useState([]);

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
          {currency[0].effectiveDate && (
            <TableRates
              data={data}
              effectiveDate={currency[1].effectiveDate}
              table={currency[1].table}
            />
          )}
        </BudgetAppSection>
      </div>
    </Wrapper>
  );
};

export default ExchangeRates;
