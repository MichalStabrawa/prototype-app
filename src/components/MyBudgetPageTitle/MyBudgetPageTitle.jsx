import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { TiArrowBackOutline } from "react-icons/ti";
import classes from './MyBudgetPageTitle.module.scss'

import { Link } from "react-router-dom";

const MyBudgetPageTitle = ({ monthYear, title, linkTitle }) => {
  return (
    <Row>
      <Col>
        <h2 className={classes.title}>
          {title} {monthYear}
          <Link to="/user">
            <Button variant="outline-secondary">
              <TiArrowBackOutline /> {linkTitle}
            </Button>
          </Link>
        </h2>
      </Col>
    </Row>
  );
};

export default MyBudgetPageTitle;
