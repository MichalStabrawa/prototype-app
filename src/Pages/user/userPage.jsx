import { useSelector } from "react-redux";
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
function UserPage({ isAuthenticated }) {
  const { data, status, isLoading, error } = useSelector(
    (state) => state.fetchUserSalary
  );
  console.log(isAuthenticated);

  const sumSalary = () => {
    if (status === "success") {
      const sum = [...data].reduce((prev, curr) => {
        return prev + +curr.expenses;
      }, 0);
      return sum;
    }
  };
  console.log("DataSalary USER");
  console.log(data);

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
                              <Badge bg="success">{sumSalary()} PLN</Badge>
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
                    </Card.Body>
                  </Card>{" "}
                </Col>
                <Col>
                  {" "}
                  <Card className={classes.card} border="light">
                    <Card.Body>
                      <ShowSavedSalary />
                    </Card.Body>
                  </Card>
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
