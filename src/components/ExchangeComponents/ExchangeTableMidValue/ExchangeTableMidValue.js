import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./ExchangeTableMidValue.module.scss";
import getCurrentPrevDifferences from "../../../utils/getCurrentPrevDifferences";
import IconArrow from "../../UI/iconArrow/iconArrow";
import Table from 'react-bootstrap/Table'

const ExchangeTableMidValue = (props) => {
  const data = useSelector((state) => state.multiple.data);
  const status = useSelector((state) => state.multiple.status);
  const [newData, setNewData] = useState(null);

  const { dataMid } = props;

  useEffect(() => {
    setNewData(dataMid);
  }, [dataMid, data]);

  return (
    <div className={classes.table_res}>
      <Table  responsive="lg" striped hover className={classes.table_rates}>
        <thead>
          <tr className={classes.table_rates_head}>
            <th>code</th>
            <th className={classes.currency}>currency</th>
            <th>mid value</th>
            <th>rate</th>
            <th>rate arrow</th>
            <th>date</th>
            <th className={classes.last_value}>lastValue</th>
            <th className={classes.last_date}>last date</th>
          </tr>
        </thead>
        <tbody>
          {status === "success" &&
            newData &&
            newData.map((el, index) => {
              if (
                el.code === "USD" ||
                el.code === "EUR" ||
                el.code === "CHF" ||
                el.code === "GBP" ||
                el.code === "JPY" ||
                el.code === "AFN" ||
                el.code === "BHD" ||
                el.code === "RSD" ||
                el.code === "VND"
              ) {
                return (
                  <tr key={index}>
                    <td className={classes.code}>{el.code}</td>
                    <td className={classes.currency}>{el.currency}</td>
                    <td className={classes.bold}>{el.mid}</td>
                    <td
                      className={`${classes.rate} ${
                        classes[getCurrentPrevDifferences(el.mid, el.lastValue)]
                      }`}
                    >
                      {(el.mid - el.lastValue).toFixed(4)}
                    </td>
                    <td>
                      <IconArrow
                        arrow={getCurrentPrevDifferences(el.mid, el.lastValue)}
                      />
                    </td>
                    <td className={classes.date}>
                      {data[0].rates[9].effectiveDate}
                    </td>
                    <td className={classes.last_value}>{el.lastValue}</td>
                    <td className={`${classes.date} ${classes.last_date}`}>
                      {data[0].rates[8].effectiveDate}
                    </td>
                  </tr>
                );
              } else {
                return null;
              }
            })}
        </tbody>
      </Table>
      <p className={classes.description}>
            *Mid – calculated currency average exchange rate (for tables A and
            B),*Table – table type,*Currency – currency name,*Code – currency
            code
          </p>
    </div>
  );
};

export default ExchangeTableMidValue;
