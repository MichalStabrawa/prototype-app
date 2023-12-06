import { useState, useEffect } from "react";
import classes from "./TableRates.module.scss";
import IconArrow from "../iconArrow/iconArrow";
import getCurrentPrevDifferences from "../../../utils/getCurrentPrevDifferences";
import getCompareLastActualValue from "../../../utils/getCurrentLastValue";
const TableRates = (props) => {
  const data = props.data;
  const [tabData, setTabData] = useState([]);
  const [effectiveDate, setEffectiveDate] = useState("");

  useEffect(() => {
    setEffectiveDate(data[1].effectiveDate);
  }, [data]);

  useEffect(() => {
    if (data.length > 0) {
      const tab = getCompareLastActualValue(data[1].rates, data[0].rates);
      setTabData(tab);
    }
  }, [data]);

  return (
    <>
      <div className={classes.table_rates}>
        <p>
          TABLE: {data[0].table} <span className={classes.date}>date: {effectiveDate}</span>
        </p>
        <table>
          <thead>
            <tr>
              <th>code</th>
              <th>currency</th>
              <th>value</th>
              <th>rate arrow</th>
              <th>rate</th>
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              tabData.map((el, index) => {
                return (
                  <tr key={index}>
                    <td>{el.code}</td>
                    <td>{el.currency}</td>
                    <td>{el.mid}</td>
                    <td>
                      <IconArrow
                        arrow={getCurrentPrevDifferences(el.mid, el.lastValue)}
                      />
                    </td>
                    <td
                      className={`${classes.rate} ${
                        classes[getCurrentPrevDifferences(el.mid, el.lastValue)]
                      }`}
                    >
                      {(el.mid - el.lastValue).toFixed(4)}
                    </td>
                    <td className={classes.date}>{effectiveDate}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableRates;
