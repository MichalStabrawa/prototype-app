import Wrapper from "../../components/UI/Wrapper/Wrapper";
import classes from "./exchange-rates.module.scss";
import { useSelector } from "react-redux";
import BudgetAppSection from "../../components/BudgetApp/BudgetAppSection/BudgetAppSection";
const ExchangeRates = (props) => {
  const currency = useSelector((state) => state.currency.data);
  console.log("Currency Page");
  console.log(Array.isArray(currency.rates));
  return (
    <Wrapper>
      <header>
        <h1>Exchange Rates</h1>
      </header>
      <div className={classes.exchange_wrapper}>
        <BudgetAppSection>
          <div className={classes.table}>
            <p>
              Table: {currency.table}, date: {currency.effectiveDate}
            </p>
            <p></p>
            <table>
              <tr>
                <th>Code</th>
                <th>Currency</th>
                <th>Value</th>
                <th>Date</th>
              </tr>
              {currency.rates &&
                currency.rates.map((el, index) => {
                  return (
                    <tr key={el.index}>
                      <td>{el.code}</td>
                      <td>{el.currency}</td>
                      <td>{el.mid}</td>
                      <td>{currency.effectiveDate}</td>
                    </tr>
                  );
                })}
            </table>
          </div>
        </BudgetAppSection>
      </div>
    </Wrapper>
  );
};

export default ExchangeRates;
