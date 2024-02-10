import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import ErrorPage from "../Error/ErrorPage";
import classes from "./Revenue.module.scss";
import expensesClasses from "../../Pages/expenses/Expenses.module.scss";
import userPageClasses from "../user/userPage.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import { countPercentCurrLastValue } from "../../utils/countPercentCurrentLastValue";
import { getMonthYear } from "../../utils/dateFunction";
import { filterMonthData } from "../../utils/filterMonth";
import { FaCalendarAlt } from "react-icons/fa";
import ReactApexChart from "react-apexcharts";
import { GiPayMoney, GiMoneyStack, GiReceiveMoney } from "react-icons/gi";
import { FaCalendarTimes, FaCalendarCheck } from "react-icons/fa";
import Form from "react-bootstrap/Form";

const Revenue = ({ auth }) => {
  return (
    <>
      {auth ? (
        <header className={`${userPageClasses.header} ${classes.revenue}`}>
          {" "}
          <Container fluid>
            <Row>
              <Col>
                {" "}
                <h2 className={classes.header_title}>Your budget revenue</h2>
              </Col>
            </Row>
            <Row className="h-100">
              <Col md={3} className="d-flex flex-column flex-fill mb-3">
                <div>
                  <Card
                    className="text-white  bg-secondary shadow h-100"
                    border="light"
                  >
                    <Card.Body className="d-flex flex-column">
                      <Card.Subtitle>
                        <span className={expensesClasses.header_span}>
                          Filter by month{" "}
                          <span className={expensesClasses.icon_wrapper}>
                            <FaCalendarAlt />
                          </span>
                        </span>
                      </Card.Subtitle>
                      <Card.Text>
                        {" "}
                        <Form.Control
                          type="month"
                          placeholder="name@example.com"
                        />
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
              <Col md={3} className="d-flex flex-column flex-fill mb-3">
                <Card
                  className="h-100 shadow text-white  bg-danger"
                  border="light"
                >
                  <Card.Body className="d-flex flex-column">
                    <Card.Subtitle>
                      {" "}
                      <span className={expensesClasses.header_span}>
                        Total Expenses{" "}
                        <span className={expensesClasses.icon_wrapper}>
                          <GiPayMoney />
                        </span>
                      </span>
                    </Card.Subtitle>
                    <Card.Text className={classes.total}>
                      <span>PLN</span>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>{" "}
              <Col md={3} className="d-flex flex-column flex-fill mb-3">
                <Card
                  className="h-100 shadow text-white  bg-primary"
                  border="light"
                >
                  <Card.Body className="d-flex flex-column">
                    <Card.Subtitle>
                      <span className={expensesClasses.header_span}>
                        Total Revenue{" "}
                        <span className={expensesClasses.icon_wrapper}>
                          <GiMoneyStack />
                        </span>
                      </span>
                    </Card.Subtitle>
                    <Card.Text className={classes.total}>
                      <span>PLN</span>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>{" "}
              <Col md={3} className="d-flex flex-column flex-fill mb-3">
                <Card className="bg-success text-white shadow h-100">
                  <Card.Body className="d-flex flex-column">
                    <Card.Subtitle>
                      {" "}
                      <span className={expensesClasses.header_span}>
                        Total month revenue
                        <span className={expensesClasses.icon_wrapper}>
                          <GiReceiveMoney />
                        </span>
                      </span>
                    </Card.Subtitle>
                    <Card.Text className={classes.total}>
                      <span>PLN</span>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </header>
      ) : (
        <ErrorPage />
      )}
    </>
  );
};

export default Revenue;
