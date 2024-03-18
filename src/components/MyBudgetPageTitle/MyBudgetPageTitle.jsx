import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { IoReturnUpBack } from "react-icons/io5";

import { Link } from "react-router-dom";

const MyBudgetPageTitle = ({ monthYear, title, linkTitle }) => {
  return (
    <Row>
      <Col>
        <h2 >
          {title} {monthYear}
          <Link to="/user">
            <Button variant="link">
              <IoReturnUpBack /> {linkTitle}
            </Button>
          </Link>
        </h2>
      </Col>
    </Row>
  );
};

export default MyBudgetPageTitle;
