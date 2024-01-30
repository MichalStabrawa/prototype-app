import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import classes from "./userPage.module.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { BsDatabase } from "react-icons/bs";
import {
  FaArrowTrendUp,
  FaArrowTrendDown,
  FaCircleInfo,
} from "react-icons/fa6";
import AddSalary from "../../components/AddSalary/AddSalary";
import ShowSavedSalary from "../../components/ShowSavedSalary/ShowSavedSalary";
import Badge from "react-bootstrap/Badge";
import AddExpenses from "../../components/AddExpenses/AddExpenses";
import ShowSavedExpenses from "../../components/ShowSavedExpenses/ShowSavedExpenses";
import ErrorPage from "../Error/ErrorPage";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  YAxis,
  Legend,
} from "recharts";
import {} from "recharts";

function UserPage({ isAuthenticated }) {
  const { data, status, isLoading, error } = useSelector(
    (state) => state.fetchUserSalary
  );

  const dataExpenses = useSelector((state) => state.fetchUserExpenses.data);
  const statusExpenses = useSelector((state) => state.fetchUserExpenses.status);
  const [maxSalary, setMaxSalary] = useState(0);
  const [minSalary, setMinSalary] = useState(0);
  const [sumShowSalary, setSumShowSalary] = useState(0);
  const [sumShowExpenses, setShowExpenses] = useState(0);

  const sumSalary = () => {
    if (status === "success") {
      const sum = [...data].reduce((prev, curr) => {
        return prev + +curr.expenses;
      }, 0);
      return sum;
    }
  };

  const sumExpenses = () => {
    if (statusExpenses === "success") {
      const sum = [...dataExpenses].reduce((prev, curr) => {
        return prev + +curr.expenses;
      }, 0);
      return sum;
    }
  };

  useEffect(() => {
    if (status === "success") {
      const max = [...data].reduce(
        (prev, next) => (+prev.expenses > +next.expenses ? prev : next),
        data[0]
      );

      // console.log(data);
      // const min = [...data].reduce(
      //   (prev, next) => (+prev.expenses < +next.expenses ? prev : next),
      //   data[0]
      // );

      const filteredData = data.filter((entry) => entry.expenses !== "");

      const expensesValues = filteredData.map((entry) =>
        parseInt(entry.expenses)
      );

      // Use reduce to find the minimum value
      const minExpenses = expensesValues.reduce(
        (min, value) => Math.min(min, value),
        Infinity
      );

      setMaxSalary(max);
      setMinSalary(minExpenses);
    }
  }, [status, isLoading]);

  useEffect(() => {
    setSumShowSalary(sumSalary());
    setShowExpenses(sumExpenses());
  }, [status, isLoading, sumShowSalary, sumShowExpenses, statusExpenses]);

  return (
    <main className={classes.user_main}>
      {!isAuthenticated && <ErrorPage />}

      {isAuthenticated && (
        <>
          {" "}
          <header className={classes.header}>
            {" "}
            <Container fluid>
              <Row>
                <Col>
                  <h2>Your budget dashboard</h2>
                </Col>
              </Row>
            </Container>
          </header>
          <section className={classes.daschboard}>
            <Container fluid>
              <Row className="h-100 g-4">
                <Col xs={12} md={4} className="d-flex flex-column flex-fill">
                  {" "}
                  <Card
                    className={`${classes.card_info} h-100 shadow`}
                    border="light"
                  >
                    <Card.Body className="d-flex flex-column">
                      <Card.Title>
                        <span className={classes.icon_wrapper}>
                          <BsDatabase />
                        </span>
                      </Card.Title>
                      <Card.Text>
                        <span className={classes.card_title}>
                          Saldo your budget
                        </span>
                      </Card.Text>
                      <Card.Text>
                        {" "}
                        <span className={classes.badge}>
                          <Badge bg="secondary">
                            {sumShowSalary - sumShowExpenses} PLN
                          </Badge>
                        </span>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={12} md={4} className="d-flex flex-column flex-fill">
                  {" "}
                  <Card
                    className={`${classes.card_info}  h-100 shadow`}
                    border="light"
                  >
                    <Card.Body className="d-flex flex-column">
                      <Card.Title>
                        <span
                          className={`${classes.icon_wrapper} ${classes.rev}`}
                        >
                          <FaArrowTrendUp />
                        </span>
                      </Card.Title>
                      <Card.Text>
                        <span className={classes.card_title}>Revenue</span>
                      </Card.Text>
                      <Card.Text>
                        {" "}
                        <span className={classes.badge}>
                          <Badge bg="success">{sumShowSalary} PLN</Badge>
                        </span>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={12} md={4} className="d-flex flex-column flex-fill">
                  {" "}
                  <Card
                    className={`${classes.card_info} h-100  shadow`}
                    border="light"
                  >
                    <Card.Body className="d-flex flex-column">
                      <Card.Title>
                        <span
                          className={`${classes.icon_wrapper} ${classes.exp}`}
                        >
                          <FaArrowTrendDown />
                        </span>
                      </Card.Title>
                      <Card.Text>
                        <span className={classes.card_wrapper}>
                          {" "}
                          <span className={classes.card_title}>
                            Expenses
                          </span>{" "}
                          <Link to={`/user/expenses`}>
                            {" "}
                            <Button
                              size="sm"
                              variant="outline-info"
                              className={classes.btn_custom}
                            >
                              <FaCircleInfo />
                            </Button>{" "}
                          </Link>
                        </span>
                      </Card.Text>
                      <Card.Text>
                        {" "}
                        <span className={classes.badge}>
                          <Badge bg="danger">{sumShowExpenses} PLN</Badge>
                        </span>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Row className="h-100">
                <Col md={4} className="d-flex flex-column flex-fill">
                  {" "}
                  <Card
                    className={`${classes.card_info} h-100 shadow`}
                    border="light"
                  >
                    <Card.Body className="d-flex flex-column">
                      <AddSalary />
                      <AddExpenses />
                    </Card.Body>
                  </Card>{" "}
                </Col>
                <Col md={8} className="d-flex flex-column flex-fill">
                  {" "}
                  <Card
                    className={`${classes.card_info} h-100 shadow`}
                    border="light"
                  >
                    <Card.Body className="d-flex flex-column">
                      <ShowSavedSalary filter={true} title="Your revenue" />
                      <ShowSavedExpenses filter={true} title="Your expenses" />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              {data.length && status === "success" && (
                <Row className="h-100">
                  <Col lg={6} className="d-flex flex-column flex-fill">
                    {" "}
                    <div className={classes.chart}>
                      <Card className="h-100 shadow" border="light">
                        {" "}
                        <Card.Body className="d-flex flex-column">
                          <Card.Subtitle>
                            Revenue{" "}
                            <Badge bg="secondary">
                              {" "}
                              <span className={classes.badge}>
                                max value:{" "}
                                {status === "success" &&
                                  maxSalary &&
                                  maxSalary.expenses}
                              </span>
                            </Badge>
                          </Card.Subtitle>{" "}
                          <div style={{ width: "100%", height: 300 }}>
                            {status === "success" && data && (
                              <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                  width={500}
                                  height={400}
                                  data={data}
                                  margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                  }}
                                >
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="name" />
                                  <YAxis domain={[0, maxSalary.expenses]} />
                                  <Tooltip />
                                  <Area
                                    type="monotone"
                                    dataKey="expenses"
                                    stroke="#8884d8"
                                    fill="#AAD9BB"
                                  />
                                </AreaChart>
                              </ResponsiveContainer>
                            )}
                          </div>
                        </Card.Body>{" "}
                      </Card>
                    </div>
                  </Col>
                  <Col xs={12} lg={6} className="d-flex flex-column flex-fill">
                    <div className={classes.chart}>
                      <Card className="h-100 shadow" border="light">
                        {" "}
                        <Card.Body className="d-flex flex-column">
                          <Card.Subtitle>
                            Revenue{" "}
                            <Badge bg="warning">
                              {" "}
                              <h5>
                                min value: {status === "success" && minSalary}
                              </h5>
                            </Badge>
                          </Card.Subtitle>{" "}
                          <div style={{ width: "100%", height: 300 }}>
                            {status === "success" && data && maxSalary && (
                              <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                  width={500}
                                  height={300}
                                  data={data}
                                  margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                  }}
                                >
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="name" />
                                  <YAxis
                                    yAxisId="left"
                                    orientation="left"
                                    stroke="#8884d8"
                                    domain={[0, +maxSalary.expenses]}
                                  />

                                  <Tooltip />
                                  <Legend />
                                  <Bar
                                    barSize={20}
                                    yAxisId="left"
                                    dataKey="expenses"
                                    fill="#9FD8DF"
                                  />
                                </BarChart>
                              </ResponsiveContainer>
                            )}
                          </div>
                        </Card.Body>{" "}
                      </Card>
                    </div>
                  </Col>
                </Row>
              )}
            </Container>
          </section>
        </>
      )}
    </main>
  );
}
export default UserPage;
