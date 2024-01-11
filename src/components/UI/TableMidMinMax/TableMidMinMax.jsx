import { useState, useEffect } from "react";
import classes from "./TableMidMinMax.module.css";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";

function TableMidMinMax({ data, status }) {
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
      {status === "rejected" && (
        <Alert variant="danger">Error fetch data!!!</Alert>
      )}
      {status === "success" && maxPrice && minPrice && (
        <div className={classes.wrapper}>
          {" "}
          <div className={classes.table_min_max}>
            {" "}
            <Table striped bordered hover>
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
        </div>
      )}
    </Col>
  );
}

export default TableMidMinMax;
