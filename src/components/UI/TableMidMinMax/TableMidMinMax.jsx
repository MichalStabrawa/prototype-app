import { useState, useEffect } from "react";
import classes from "./TableMidMinMax.module.scss";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";

function TableMidMinMax({ data, status,dateStart,dateEnd }) {
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();

  useEffect(() => {
    if (status === "success" && data) {
      const max = [...data.rates].reduce((prev, next) =>
        prev.mid > next.mid ? prev : next
      );

      const min = [...data.rates].reduce((prev, next) =>
        prev.mid < next.mid ? prev : next
      );

      setMaxPrice(max);
      setMinPrice(min);
    }
  }, [status, data]);
  return (
    <Col>
      {status === "success" && maxPrice && minPrice && (
        <div className={classes.table_wrapper}>
          {" "}
          <div className={classes.table_min_max}>
            {" "}
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th>min value</th>
                  <th>date (min)</th>
                  <th>max value</th>
                  <th>date (max)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={classes.min}>{minPrice.mid}</td>
                  <td className={classes.date_min_max}>
                    {minPrice.effectiveDate}
                  </td>
                  <td className={classes.max}>{maxPrice.mid}</td>
                  <td className={classes.date_min_max}>
                    {maxPrice.effectiveDate}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
          <p className={classes.description}>
            *Mid – calculated currency average exchange rate (for tables A and
            B),*Table – table type,*Currency – currency name,*Code – currency
            code
          </p>
          <p className={classes.text}>Code: {data.code}, Currency: {data.currency}, Table: {data.table}, date start: {dateStart}, date end: {dateEnd}</p>
        </div>
      )}
    </Col>
  );
}

export default TableMidMinMax;
