import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Expenses.module.scss";
import userPageClasses from "../user/userPage.module.scss";
import ErrorPage from "../Error/ErrorPage";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { FaArrowTrendDown } from "react-icons/fa6";
import { BsDatabase } from "react-icons/bs";
import { FaCalendarTimes, FaCalendarCheck } from "react-icons/fa";
import Form from "react-bootstrap/Form";

import ExpensesCardWithTable from "../../components/ExpensesComponents/ExpensesCardwithTable/ExpensesCardWithTable";
import ExpensesChart from "../../components/ExpensesComponents/ExpensesChart/ExpensesChart";
import { countPercentCurrLastValue } from "../../utils/countPercentCurrentLastValue";
import { getMonthYear } from "../../utils/dateFunction";
import { filterMonthData } from "../../utils/filterMonth";
import { FaCalendarAlt } from "react-icons/fa";
import ReactApexChart from "react-apexcharts";
import { GiPayMoney, GiMoneyStack, GiReceiveMoney } from "react-icons/gi";

const chartInit = {
  series: [],
  options: {
    chart: {
      width: 450,

      type: "pie",
    },
    labels: [],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  },
};
const chartLineInit = {
  series: [
    {
      name: "Desktops",
      data: [],
    },
  ],
  options: {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [],
    },
  },
};

function Expenses({ auth }) {
  const { data, status, isLoading, error } = useSelector(
    (state) => state.fetchUserSalary
  );
  const dataExpenses = useSelector((state) => state.fetchUserExpenses.data);
  const statusExpenses = useSelector((state) => state.fetchUserExpenses.status);
  const [sumShowSalary, setSumShowSalary] = useState(0);
  const [sumShowExpenses, setShowExpenses] = useState(0);
  const [deadline, setDeadline] = useState(null);
  const [valueDeadline, setValueDeadline] = useState(0);
  const [deadlineOk, setDeadlineOk] = useState(null);
  const [countDeadlinePercent, setCountDealinePercent] = useState(0);

  const [monthYear, setMonthYear] = useState(getMonthYear());
  const [dataMonth, setDataMonth] = useState([]);
  const [dataMonthExpenses, setDataMonthExpenses] = useState([]);
  const [chart, setChart] = useState(chartInit);
  const [chartDadline, setChartDeadline] = useState(chartInit);
  const [chartLine, setChartLine] = useState(chartLineInit);
  const [chartLineDeadline, setChartLineDeadline] = useState(chartLineInit);
  const [saldo, setSaldo] = useState([]);

  const handleInputMonth = (e) => {
    setMonthYear(e.target.value);
  };
  const sumTotal = () => {
    if (status === "success") {
      const sum = [...data].reduce((prev, curr) => {
        return prev + +curr.expenses;
      }, 0);
      return sum;
    }
  };

  const sumTotalExpenses = () => {
    if (status === "success") {
      const sum = [...dataExpenses].reduce((prev, curr) => {
        return prev + +curr.expenses;
      }, 0);
      return sum;
    }
  };
  const sumSalary = () => {
    if (status === "success" && dataMonth && monthYear) {
      const sum = [...dataMonth].reduce((prev, curr) => {
        return prev + +curr.expenses;
      }, 0);
      return sum;
    }
  };

  const sumExpenses = () => {
    if (statusExpenses === "success") {
      const sum = [...dataMonthExpenses].reduce((prev, curr) => {
        return prev + +curr.expenses;
      }, 0);
      return sum;
    }
  };

  useEffect(() => {
    setSumShowSalary(sumSalary());
    setShowExpenses(sumExpenses());
  }, [
    status,
    isLoading,
    sumShowSalary,
    sumShowExpenses,
    statusExpenses,
    monthYear,
    dataMonthExpenses,
    dataMonth,
  ]);

  useEffect(() => {
    if (statusExpenses === "success") {
      const filteredData = dataMonthExpenses.filter(
        (item) => item.deadline === "on"
      );
      setDeadline(filteredData);
    }
  }, [dataExpenses, statusExpenses, dataMonthExpenses, monthYear]);

  useEffect(() => {
    if (deadline) {
      const valueDeadline = deadline.reduce(
        (prev, cur) => prev + cur.expenses,
        0
      );
      setValueDeadline(valueDeadline);
    }
  }, [deadline, monthYear]);

  useEffect(() => {
    if (valueDeadline !== null && sumShowExpenses !== null) {
      const countPercent = +countPercentCurrLastValue(
        valueDeadline,
        sumShowExpenses
      );
      console.log(`CountPercentAlert!!! ${typeof countPercent}`);
      console.log(countPercent);

      const count = +(100 + countPercent).toFixed(1);
      console.log("Count");
      console.log(count + typeof count);

      setCountDealinePercent(count);
    }
  }, [valueDeadline, sumShowExpenses, monthYear]);

  useEffect(() => {
    if (statusExpenses === "success") {
      const filteredData = dataMonthExpenses.filter(
        (item) => item.deadline === "off"
      );
      setDeadlineOk(filteredData);
    }
  }, [dataMonthExpenses, statusExpenses, monthYear]);

  useEffect(() => {
    filterMonthData(data, status, monthYear, setDataMonth);
    filterMonthData(
      dataExpenses,
      statusExpenses,
      monthYear,
      setDataMonthExpenses
    );
  }, [monthYear, data, dataExpenses]);

  useEffect(() => {
    setChart((prevChart) => {
      return {
        ...prevChart,
        series: dataMonthExpenses.map((item) => item.expenses),
        options: {
          ...prevChart,
          labels: dataMonthExpenses.map((item) => item.name),
        },
      };
    });

    setChartLine((prevLine) => {
      return {
        ...prevLine,
        series: [
          {
            name: "",
            data: dataMonthExpenses.map((item) => item.expenses),
          },
        ],
      };
    });
  }, [monthYear, dataMonthExpenses]);

  useEffect(() => {
    if (deadline) {
      setChartDeadline((prevDeadline) => {
        return {
          ...prevDeadline,
          series: deadline.map((item) => item.expenses),
          options: {
            ...prevDeadline,
            labels: deadline.map((item) => item.name),
          },
        };
      });

      setChartLineDeadline((prevLineD) => {
        return {
          ...prevLineD,
          series: [
            {
              name: "",
              data: deadline.map((item) => item.expenses),
            },
          ],
        };
      });
    }
  }, [deadline, monthYear]);

  useEffect(() => {
    if (sumShowSalary && sumShowExpenses) {
      setSaldo({
        series: [
          {
            name: "Revenue",
            data: [sumShowSalary],
          },
          {
            name: "Expenses",
            data: [sumShowExpenses],
          },
        ],
        options: {
          chart: {
            type: "bar",
            height: 350,
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "20%",
              endingShape: "rounded",
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            show: true,
            width: 2,
            colors: ["transparent"],
          },
          xaxis: {
            categories: ["Compare"],
          },
          yaxis: {
            title: {
              text: "PLN",
            },
          },
          fill: {
            opacity: 1,
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return "PLN " + val + " thousands";
              },
            },
          },
          colors: ["#D5F0C1", "#FF7171"],
        },
      });
    }
  }, [monthYear, sumShowSalary, sumShowExpenses]);

  return (
    <main main className={`${userPageClasses.user_main} ${classes.expenses}`}>
      {auth ? (
        <>
          <header className={userPageClasses.header}>
            {" "}
            <Container fluid>
              <Row>
                <Col>
                  {" "}
                  <h2 className={classes.header_title}>
                    Your budget expenses {monthYear}
                  </h2>
                </Col>
              </Row>
              <Row className="h-100">
                <Col md={3} className="d-flex flex-column flex-fill">
                  <div>
                    <Card
                      className="text-white  bg-secondary shadow h-100"
                      border="light"
                    >
                      <Card.Body className="d-flex flex-column">
                        <Card.Subtitle>
                          <span className={classes.header_span}>
                            Filter by month{" "}
                            <span className={classes.icon_wrapper}>
                              <FaCalendarAlt />
                            </span>
                          </span>
                        </Card.Subtitle>
                        <Card.Text>
                          {" "}
                          <Form.Control
                            onChange={handleInputMonth}
                            value={monthYear}
                            type="month"
                            placeholder="name@example.com"
                          />
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                </Col>
                <Col md={3} className="d-flex flex-column flex-fill">
                  <Card
                    className="h-100 shadow text-white  bg-danger"
                    border="light"
                  >
                    <Card.Body className="d-flex flex-column">
                      <Card.Subtitle>
                        {" "}
                        <span className={classes.header_span}>
                          Total Expenses{" "}
                          <span className={classes.icon_wrapper}>
                            <GiPayMoney />
                          </span>
                        </span>
                      </Card.Subtitle>
                      <Card.Text>{sumTotalExpenses()}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>{" "}
                <Col md={3} className="d-flex flex-column flex-fill">
                  <Card
                    className="h-100 shadow text-white  bg-primary"
                    border="light"
                  >
                    <Card.Body className="d-flex flex-column">
                      <Card.Subtitle>
                        <span className={classes.header_span}>
                          Total Revenue{" "}
                          <span className={classes.icon_wrapper}>
                            <GiMoneyStack />
                          </span>
                        </span>
                      </Card.Subtitle>
                      <Card.Text>{sumTotal()}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>{" "}
                <Col md={3} className="d-flex flex-column flex-fill">
                  <Card className="bg-success text-white shadow h-100">
                    <Card.Body className="d-flex flex-column">
                      <Card.Subtitle>
                        {" "}
                        <span className={classes.header_span}>
                          Total month revenue
                          <span className={classes.icon_wrapper}>
                            <GiReceiveMoney />
                          </span>
                        </span>
                      </Card.Subtitle>
                      <Card.Text>{sumSalary()}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}></Col>
              </Row>
            </Container>
          </header>
          <section
            className={`${userPageClasses.daschboard} ${userPageClasses.exspenses}`}
          >
            <Container fluid>
              <Row className="h-100">
                <Col xs={12} md={4} className="d-flex flex-column flex-fill">
                  <Card
                    className={`${userPageClasses.card_info} h-100 shadow`}
                    border="light"
                  >
                    <Card.Body className="d-flex flex-column">
                      <Card.Title>
                        <span
                          className={`${userPageClasses.icon_wrapper} ${userPageClasses.exp}`}
                        >
                          <FaArrowTrendDown />
                        </span>
                      </Card.Title>
                      <Card.Text>
                        <span className={userPageClasses.card_title}>
                          Expenses
                        </span>
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
                      </Card.Text>
                      <Card.Text>
                        <span className={userPageClasses.badge}>
                          <Badge bg="danger"> {sumShowExpenses} PLN</Badge>
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
                    <Card.Body className="d-flex flex-column">
                      <Card.Title>
                        <span className={userPageClasses.icon_wrapper}>
                          <BsDatabase />
                        </span>
                      </Card.Title>
                      <Card.Text>
                        <span className={userPageClasses.card_title}>
                          Saldo your budget
                        </span>
                        {saldo.options && saldo.series && (
                          <div>
                            <div id="chart">
                              <ReactApexChart
                                options={saldo.options}
                                series={saldo.series}
                                type="bar"
                                height={200}
                              />
                            </div>
                            <div id="html-dist"></div>
                          </div>
                        )}
                      </Card.Text>
                      <Card.Text>
                        <span className={userPageClasses.badge}>
                          <Badge bg="secondary">
                            {sumShowSalary - sumShowExpenses}PLN
                          </Badge>
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
                    <Card.Body className="d-flex flex-column">
                      <Card.Title>
                        <span
                          className={`${userPageClasses.icon_wrapper} ${userPageClasses.deadline}`}
                        >
                          <FaCalendarTimes />
                        </span>
                      </Card.Title>
                      <Card.Text>
                        <span className={userPageClasses.card_title}>
                          Bills due for payment
                        </span>
                        {chartLineDeadline.options &&
                          chartLineDeadline.series && (
                            <div>
                              <div id="chart">
                                <ReactApexChart
                                  options={chartLineDeadline.options}
                                  series={chartLineDeadline.series}
                                  type="line"
                                  height={200}
                                />
                              </div>
                              <div id="html-dist"></div>
                            </div>
                          )}
                      </Card.Text>
                      <Card.Text>
                        <span className={userPageClasses.badge}>
                          <Badge bg="warning">
                            value: {valueDeadline && valueDeadline}
                          </Badge>
                          <Badge text="danger" bg="dark">
                            quantity: {deadline && deadline.length} x
                          </Badge>
                        </span>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={12} md={3} className="d-flex flex-column flex-fill">
                  <Card
                    className={`${userPageClasses.card_info} h-100 shadow`}
                    border="light"
                  >
                    <Card.Body className="d-flex flex-column">
                      <Card.Title>
                        <span
                          className={`${userPageClasses.icon_wrapper} ${userPageClasses.deadline_ok}`}
                        >
                          <FaCalendarCheck />
                        </span>
                      </Card.Title>
                      <Card.Text>
                        <span className={userPageClasses.card_title}>
                          The bills have already been paid
                        </span>
                      </Card.Text>
                      <Card.Text>
                        <span className={userPageClasses.badge}>
                          <Badge bg="success">
                            value:{" "}
                            {valueDeadline &&
                              sumShowExpenses &&
                              sumShowExpenses - valueDeadline}{" "}
                          </Badge>
                          <Badge text="success" bg="dark">
                            quantity: {deadlineOk && deadlineOk.length} x
                          </Badge>
                        </span>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row className="h-100 g-4">
                <Col md={6} className="d-flex flex-column flex-fill">
                  <ExpensesCardWithTable
                    badgeData={valueDeadline}
                    data={deadline}
                    statusExpenses={statusExpenses}
                    title="Expenses with deadline !!"
                    countPercent={countDeadlinePercent}
                    percent={true}
                    counter={true}
                  />
                </Col>
                <Col md={6} className="d-flex flex-column flex-fill">
                  <ExpensesCardWithTable
                    badgeData={sumShowExpenses}
                    data={dataMonthExpenses}
                    statusExpenses={statusExpenses}
                    title="All expenses"
                  />
                </Col>
              </Row>
              <Row className="h-100">
                <Col xs={12} md={6}>
                  {deadline && (
                    <ExpensesChart
                      color="red"
                      data={deadline}
                      title="Deadline chart"
                      badgeData={valueDeadline}
                    />
                  )}
                </Col>
                <Col xs={12} md={6} className="d-flex flex-column flex-fill">
                  {dataExpenses && (
                    <ExpensesChart
                      data={dataMonthExpenses}
                      title="All expenses chart"
                      badgeData={sumShowExpenses}
                    />
                  )}
                </Col>
              </Row>
              <Row className="h-100">
                <Col
                  xs={12}
                  lg={6}
                  className={`${classes.achart_wrapper} "d-flex flex-column flex-fill"`}
                >
                  {" "}
                  <Card className="h-100 shadow">
                    <Card.Header>Deadline chart</Card.Header>
                    <Card.Body className="d-flex flex-column">
                      {chartDadline.options && chartDadline.series && (
                        <div className="h-100">
                          <div id="chart" className="h-100">
                            <ReactApexChart
                              options={chartDadline.options}
                              series={chartDadline.series}
                              type="pie"
                              width={450}
                            />
                          </div>
                          <div id="html-dist"></div>
                        </div>
                      )}

                      <div className={classes.month}>
                        <Form.Control
                          onChange={handleInputMonth}
                          value={monthYear}
                          type="month"
                          placeholder="name@example.com"
                        />
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col
                  xs={12}
                  lg={6}
                  className={`${classes.achart_wrapper} "d-flex flex-column flex-fill"`}
                >
                  <Card className="h-100 shadow">
                    <Card.Header>All expenses chart</Card.Header>
                    <Card.Body className="d-flex flex-column">
                      {chart.options && chart.series && (
                        <div className="h-100">
                          <div className="h-100" id="chart">
                            <ReactApexChart
                              options={chart.options}
                              series={chart.series}
                              type="pie"
                              width={450}
                            />
                          </div>
                          <div id="html-dist"></div>
                        </div>
                      )}

                      <div className={classes.month}>
                        <Form.Control
                          onChange={handleInputMonth}
                          value={monthYear}
                          type="month"
                          placeholder="name@example.com"
                        />
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
        </>
      ) : (
        <ErrorPage />
      )}
    </main>
  );
}

export default Expenses;
