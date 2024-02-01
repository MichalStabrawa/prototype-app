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

  const handleInputMonth = (e) => {
    setMonthYear(e.target.value);
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

  console.log("Expesnes Page");
  console.log(dataMonth);
  console.log(dataMonthExpenses);

  return (
    <main main className={`${userPageClasses.user_main} ${classes.expenses}`}>
      {auth ? (
        <>
          <header className={userPageClasses.header}>
            {" "}
            <Container fluid>
              <Row>
                <Col>
                  <h2>Your budget expenses {monthYear}</h2>
                  <div className={classes.month}>
                    <Form.Control
                      onChange={handleInputMonth}
                      value={monthYear}
                      type="month"
                      placeholder="name@example.com"
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          </header>
          <section
            className={`${userPageClasses.daschboard} ${userPageClasses.exspenses}`}
          >
            <Container fluid>
              <Row className="h-100">
                <Col xs={12} md={3} className="d-flex flex-column flex-fill">
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
                      </Card.Text>
                      <Card.Text>
                        <span className={userPageClasses.badge}>
                          <Badge bg="danger"> {sumShowExpenses} PLN</Badge>
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
                        <span className={userPageClasses.icon_wrapper}>
                          <BsDatabase />
                        </span>
                      </Card.Title>
                      <Card.Text>
                        <span className={userPageClasses.card_title}>
                          Saldo your budget
                        </span>
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
                <Col xs={12} md={3} className="d-flex flex-column flex-fill">
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
