import { useSelector, useDispatch } from "react-redux";
import classes from "./gold.module.scss";
import Wrapper from "../../components/UI/Wrapper/Wrapper";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import { GiGoldBar } from "react-icons/gi";
import IconArrow from "../../components/UI/iconArrow/iconArrow";
import getCurrentPrevDifferences from "../../utils/getCurrentPrevDifferences";

const Gold = () => {
  const gold = useSelector((state) => state.goldFetch.data);
  const status = useSelector((state) => state.goldFetch.status);
  return (
    <>
      <header className={classes.header}>
        <Container fluid>
          <Row>
            <Col>
              <h1>
                Gold section{" "}
                <span>
                  <GiGoldBar />
                </span>
              </h1>
              <p className={classes.header_description}>
                Gold price query parameters
              </p>
            </Col>
          </Row>
        </Container>
      </header>

      <Wrapper css="grey">
        <main className={classes.gold}>
          <Container fluid>
            <Row>
              <Col xs={12} md={6}>
                <h2 className={classes.title}>Actual gold price </h2>
                {status === "success" && (
                  <Card className="mb-2">
                    <Card.Header as="h5">Gold price actual</Card.Header>
                    <Card.Body>
                      <Card.Title>{gold[1].cena} PLN/g</Card.Title>
                      <Card.Text>{`date: ${gold[1].data}`}</Card.Text>
                      <Card.Text>
                        <span
                          className={`${classes.rate} ${
                            classes[
                              getCurrentPrevDifferences(
                                gold[1].cena,
                                gold[0].cena
                              )
                            ]
                          }`}
                        >
                          {(gold[1].cena - gold[0].cena).toFixed(4)}
                        </span>
                        <IconArrow
                          arrow={getCurrentPrevDifferences(
                            gold[1].cena,
                            gold[0].cena
                          )}
                        />
                      </Card.Text>
                      <Card.Text>
                        <p className={classes.prev_price}>
                          {" "}
                          Previous price: {gold[0].cena} PLN/g{" "}
                        </p>

                        <span className={classes.date}>
                          previous date: {gold[0].data}
                        </span>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                )}
              </Col>
            </Row>
          </Container>
        </main>
      </Wrapper>
    </>
  );
};

export default Gold;
