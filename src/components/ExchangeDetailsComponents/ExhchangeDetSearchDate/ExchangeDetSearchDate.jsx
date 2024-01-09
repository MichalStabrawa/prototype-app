import {useState} from 'react'
import classes from "./ExchangeDetSearchDate.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table'

function ExchangeDetSearchDate({data,currency}) {
  const [lastDate,setLastDate] = useState();

  const handleInputDate = (e)=> {
    setLastDate(e.target.value)
  }
  return (
    <div className={classes.details_wrapper}>
      <Row>
        <Col>
          <h2 className={classes.title}>Search currency {} to date</h2>
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
          Select a date and check the value.
        </span>
      </Form.Label>
        </Col>
        <Col>
        <div className={classes.table}>
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
                <td className={classes.value}>{ data[0].mid} </td>
                {/* <td className={classes.date}>{gold[1].data}</td> */}
                <td className={classes.value}>{currency[1].effectiveDate}</td>
                <td className={classes.date}>{lastDate}</td>
                {/* <td
                  className={`${
                    classes[
                      getCurrentPrevDifferences(gold[1].cena, goldDate[0].cena)
                    ]
                  }`}
                > */}
                  {/* {(gold[1].cena - goldDate[0].cena).toFixed(4)} */}
               {/* </tr> </td> */}
                {/* <td
                  className={`${
                    classes[
                      getCurrentPrevDifferences(gold[1].cena, goldDate[0].cena)
                    ]
                  }`}
                >
                  {((100 * gold[1].cena) / goldDate[0].cena - 100).toFixed(4) +
                    "%"}
                </td> */}
              </tr>
            </tbody>
          </Table>
          <label>Last selected date {lastDate}</label>
        </div></Col>
      </Row>
    </div>
  );
}

export default ExchangeDetSearchDate;
