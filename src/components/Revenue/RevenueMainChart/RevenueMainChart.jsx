import classes from "./RevenueMainChart.module.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ReactApexChart from "react-apexcharts";

function RevenueMainChart() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Card>
            {" "}
            <Card.Header>Total Income chart</Card.Header>
            <Card.Body></Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default RevenueMainChart;
