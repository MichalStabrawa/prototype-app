import classes from "./RevenueMainChart.module.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ReactApexChart from "react-apexcharts";
import { FaChartBar } from "react-icons/fa";
import userPageClasses from "../../../Pages/user/userPage.module.scss";
import Badge from "react-bootstrap/Badge";

function RevenueMainChart({searchLine,total}) {
  return (
    <Container fluid>
      <Row>
        <Col>
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
                  className={`${userPageClasses.icon_wrapper} `}
                >
                  <FaChartBar />
                </span>
              </Card.Title>
              <Card.Text>
                {" "}
                <span className={userPageClasses.card_title}>
                  Total income bart chart
                </span>
              </Card.Text>
              <Card.Text>
                <span className={userPageClasses.badge}>
                  <Badge bg="success">{total} PLN</Badge>
                </span>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default RevenueMainChart;
