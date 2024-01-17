import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import classes from "./userPage.module.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { BsDatabase } from "react-icons/bs";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import AddSalary from "../../components/AddSalary/AddSalary";
import ShowSavedSalary from "../../components/ShowSavedSalary/ShowSavedSalary";
import Badge from "react-bootstrap/Badge";
import AddExpenses from "../../components/AddExpenses/AddExpenses";
import ShowSavedExpenses from "../../components/ShowSavedExpenses/ShowSavedExpenses";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FaSearch } from "react-icons/fa";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
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
  const [difference, setDifference] = useState();

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

      console.log(minExpenses);

      setMaxSalary(max);
      setMinSalary(minExpenses);
    }
  }, [status, isLoading]);

  useEffect(() => {
    setSumShowSalary(sumSalary());
    setShowExpenses(sumExpenses());
  }, [status, isLoading, sumShowSalary, sumShowExpenses, statusExpenses]);

  console.log(`MIN: ${minSalary.name}`);
  return (
    <main className={classes.user_main}>
      {!isAuthenticated && (
        <Container>
          <Row>
            <Col>
              <div>Login</div>
            </Col>
          </Row>
        </Container>
      )}
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
              <Row>
                <Col xs={12} lg={3}>
                  <Row>
                    <Col xs={12}>
                      {" "}
                      <Card className={classes.card_info} border="light">
                        <Card.Body>
                          <Card.Title>
                            <span className={classes.icon_wrapper}>
                              <BsDatabase />
                            </span>
                          </Card.Title>
                          <Card.Text>
                            <h5>Saldo your budget</h5>
                          </Card.Text>
                          <Card.Text>
                            {" "}
                            <h3>
                              <Badge bg="secondary">
                                {sumShowSalary - sumShowExpenses} PLN
                              </Badge>
                            </h3>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col xs={12}>
                      {" "}
                      <Card className={classes.card_info} border="light">
                        <Card.Body>
                          <Card.Title>
                            <span
                              className={`${classes.icon_wrapper} ${classes.rev}`}
                            >
                              <FaArrowTrendUp />
                            </span>
                          </Card.Title>
                          <Card.Text>
                            <h5>Revenue</h5>
                          </Card.Text>
                          <Card.Text>
                            {" "}
                            <h3>
                              <Badge bg="success">{sumShowSalary} PLN</Badge>
                            </h3>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col xs={12}>
                      {" "}
                      <Card className={classes.card_info} border="light">
                        <Card.Body>
                          <Card.Title>
                            <span
                              className={`${classes.icon_wrapper} ${classes.exp}`}
                            >
                              <FaArrowTrendDown />
                            </span>
                          </Card.Title>
                          <Card.Text>
                            <h5>Expenses</h5>
                          </Card.Text>
                          <Card.Text>
                            {" "}
                            <h3>
                              <Badge bg="danger">{sumShowExpenses} PLN</Badge>
                            </h3>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Col>
                <Col xs={12} lg={4}>
                  {" "}
                  <Card className={classes.card} border="light">
                    <Card.Body>
                      <AddSalary />
                      <AddExpenses />
                    </Card.Body>
                  </Card>{" "}
                </Col>
                <Col>
                  {" "}
                  <Card className={classes.card} border="light">
                    <Card.Body>
                      <ShowSavedSalary filter={true} title="Your revenue" />
                      <ShowSavedExpenses filter={true} title="Your expenses" />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col xs={12} lg={6}>
                  <div className={classes.chart}>
                    <Card border="light">
                      {" "}
                      <Card.Body>
                        <Card.Subtitle>
                          Revenue{" "}
                          <Badge bg="secondary">
                            {" "}
                            <h5>
                              max value:{" "}
                              {status === "success" && maxSalary.expenses}
                            </h5>
                          </Badge>
                        </Card.Subtitle>{" "}
                        <div style={{ width: "100%", height: 300 }}>
                          {status === "success" && (
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
                                <YAxis domain={[0, +maxSalary.expenses]} />
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
                <Col xs={12} lg={6}>
                  <div className={classes.chart}>
                    <Card border="light">
                      {" "}
                      <Card.Body>
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
                          {status === "success" && (
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
            </Container>
          </section>
        </>
      )}
    </main>
  );
}
export default UserPage;
