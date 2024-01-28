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
import {
  FaCalendarPlus,
  FaCalendarTimes,
  FaCalendarCheck,
} from "react-icons/fa";
import TableExpenses from "../../components/Table/TableExpenses/TableExpenses";

function Expenses({ auth }) {
  const { data, status, isLoading, error } = useSelector(
    (state) => state.fetchUserSalary
  );
  const dataExpenses = useSelector((state) => state.fetchUserExpenses.data);
  const statusExpenses = useSelector((state) => state.fetchUserExpenses.status);
  const [sumShowSalary, setSumShowSalary] = useState(0);
  const [sumShowExpenses, setShowExpenses] = useState(0);
  const [deadline, setDeadline] = useState(null);
  const [valueDeadline, setValueDeadline] = useState(null);
  const [deadlineOk, setDeadlineOk] = useState(null);

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
    setSumShowSalary(sumSalary());
    setShowExpenses(sumExpenses());
  }, [status, isLoading, sumShowSalary, sumShowExpenses, statusExpenses]);

  useEffect(() => {
    if (statusExpenses === "success") {
      const filteredData = dataExpenses.filter(
        (item) => item.deadline === "on"
      );
      setDeadline(filteredData);
    }
  }, [dataExpenses, statusExpenses]);

  useEffect(() => {
    if (deadline) {
      const valueDeadline = deadline.reduce(
        (prev, cur) => prev + cur.expenses,
        0
      );
      setValueDeadline(valueDeadline);
    }
  }, [deadline]);
  useEffect(() => {
    if (statusExpenses === "success") {
      const filteredData = dataExpenses.filter(
        (item) => item.deadline === "off"
      );
      setDeadlineOk(filteredData);
    }
  }, [dataExpenses, statusExpenses]);

  console.log(data);
  console.log(dataExpenses);
  return (
    <main main className={`${userPageClasses.user_main} ${classes.expenses}`}>
      {auth ? (
        <>
          <header className={userPageClasses.header}>
            {" "}
            <Container fluid>
              <Row>
                <Col>
                  <h2>Your budget expenses</h2>
                </Col>
              </Row>
            </Container>
          </header>
          <section
            className={`${userPageClasses.daschboard} ${userPageClasses.exspenses}`}
          >
            <Container fluid>
              <Row>
                <Col xs={12} md={3}>
                  <Card className={userPageClasses.card_info} border="light">
                    <Card.Body>
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
                        {" "}
                        <span className={userPageClasses.badge}>
                          <Badge bg="danger"> {sumShowExpenses} PLN</Badge>
                        </span>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={12} md={3}>
                  {" "}
                  <Card className={userPageClasses.card_info} border="light">
                    <Card.Body>
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
                        {" "}
                        <span className={userPageClasses.badge}>
                          <Badge bg="secondary">
                            {sumShowSalary - sumShowExpenses}PLN
                          </Badge>
                        </span>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={12} md={3}>
                  {" "}
                  <Card className={userPageClasses.card_info} border="light">
                    <Card.Body>
                      <Card.Title>
                        <span
                          className={`${userPageClasses.icon_wrapper} ${userPageClasses.deadline}`}
                        >
                          <FaCalendarTimes />
                        </span>
                      </Card.Title>
                      <Card.Text>
                        <span className={userPageClasses.card_title}>
                          Deadline,Invoices with due date{" "}
                        </span>
                      </Card.Text>
                      <Card.Text>
                        {" "}
                        <span className={userPageClasses.badge}>
                          <Badge bg="warning">
                            value:{valueDeadline && valueDeadline}{" "}
                          </Badge>
                          <Badge text="danger" bg="dark">
                            quantity: {deadline && deadline.length} x
                          </Badge>
                        </span>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={12} md={3}>
                  {" "}
                  <Card className={userPageClasses.card_info} border="light">
                    <Card.Body>
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
                        {" "}
                        <span className={userPageClasses.badge}>
                          <Badge bg="success">
                            value:
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
              <Row>
                <Col md={6}>
                  <Card border="light">
                    <Card.Header>
                      <Card.Title>
                        Expenses with deadline{" "}
                        <Badge bg="danger">
                          {valueDeadline && valueDeadline}
                        </Badge>
                      </Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <TableExpenses
                        data={deadline}
                        status={statusExpenses}
                        responsive="sm"
                        striped
                        hover
                      />
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card border="light">
                    <Card.Header>
                      <Card.Title>
                        All Expenses{" "}
                        <Badge bg="light" text="dark">
                          {sumShowExpenses}
                        </Badge>
                      </Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <TableExpenses
                        data={dataExpenses}
                        status={statusExpenses}
                        responsive="sm"
                        striped
                        hover
                      ></TableExpenses>
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
