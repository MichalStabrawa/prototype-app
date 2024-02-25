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
import { FaArrowTrendUp } from "react-icons/fa6";
import { chartLineInit } from "../../helpers/chartVariables/chart-line";

import ShowSavedSalary from "../../components/ShowSavedSalary/ShowSavedSalary";

const Revenue = ({ auth }) => {
  const { data, status, isLoading, error } = useSelector(
    (state) => state.fetchUserSalary
  );
  const [monthYear, setMonthYear] = useState(getMonthYear());
  const [searchDate, setSearchDate] = useState("");

  const handleInputMonth = (e) => {
    setMonthYear(e.target.value);
  };
  const [chartLine, setChartLine] = useState(chartLineInit);

  const sumTotal = () => {
    if (status === "success") {
      const sum = [...data].reduce((prev, curr) => {
        return prev + +curr.expenses;
      }, 0);

      return sum;
    }
  };

  const sumTotalMonth = () => {
    if (status === "success" && searchDate) {
      const sumMonth = [...searchDate].reduce((prev, curr) => {
        return prev + parseFloat(curr.expenses);
      }, 0);

      return sumMonth;
    }
  };

  useEffect(() => {
    if (data.length > 0) {
      setChartLine((prevLine) => ({
        ...prevLine,
        series: [
          {
            data: data.map((item) => item.expenses),
          },
        ],
        options: {
          ...prevLine.options,
          xaxis: {
            categories: data.map((item) => item.fullDate),
          },
        },
      }));
    }
  }, [monthYear, data]);
  return (
    <div className={userPageClasses.user_main}>
      {auth ? (
        <>
          <header className={`${userPageClasses.header} ${classes.revenue}`}>
            {" "}
            <Container fluid>
              <Row>
                <Col>
                  {" "}
                  <h2 className={classes.header_title}>
                    Your budget revenue {monthYear}
                  </h2>
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
                            onChange={handleInputMonth}
                            type="month"
                            value={monthYear}
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
                        <span>{sumTotal()}PLN</span>
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
                        <span>{sumTotalMonth()}PLN</span>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </header>
          <section
            className={`${userPageClasses.daschboard} ${userPageClasses.exspenses}`}
          >
            {" "}
            <Container fluid>
              {" "}
              <Row className="h-100">
                {" "}
                <Col xs={12} md={4} className="d-flex flex-column flex-fill">
                  {" "}
                  <Card
                    className={`${userPageClasses.card_info} h-100 shadow`}
                    border="light"
                  >
                    {" "}
                    <Card.Body className="d-flex flex-column">
                      {" "}
                      <Card.Title>
                        {" "}
                        <span
                          className={`${userPageClasses.icon_wrapper} ${userPageClasses.rev}`}
                        >
                          <FaArrowTrendUp />
                        </span>
                      </Card.Title>
                      <Card.Text>
                        <span className={userPageClasses.card_title}>
                          Total income
                        </span>
                      </Card.Text>
                      {chartLine.options && chartLine.series && (
                        <div>
                          <div id="chart">
                            <ReactApexChart
                              options={chartLine.options}
                              series={chartLine.series}
                              type="line"
                              height={200}
                            />
                          </div>
                          <div id="html-dist"></div>
                        </div>
                      )}
                      <Card.Text>
                        <span className={userPageClasses.badge}>
                          <Badge bg="success">{sumTotal()}PLN</Badge>
                        </span>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={12} md={4} className="d-flex flex-column flex-fill">
                  <Card
                    className={`${userPageClasses.card_info} h-100 shadow`}
                    border="light"
                  >
                    <Card.Body>
                      <Card.Title>
                        {" "}
                        <span
                          className={`${userPageClasses.icon_wrapper} ${userPageClasses.rev}`}
                        >
                          <FaArrowTrendUp />
                        </span>
                      </Card.Title>
                      <Card.Text>
                        <span className={userPageClasses.card_title}>
                          Totla month revenue table
                        </span>
                      </Card.Text>
                      <ShowSavedSalary filter={true} monthYear={monthYear} />
                    </Card.Body>{" "}
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
        </>
      ) : (
        <ErrorPage />
      )}
    </div>
  );
};

export default Revenue;
