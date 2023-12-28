import BudgetAppSection from "../../components/BudgetApp/BudgetAppSection/BudgetAppSection";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function BidAsk() {
  return <BudgetAppSection>
    <header>
        <Container fluid>
            <Row>
                <Col>
                <h1>Bid & Ask currency</h1></Col>
            </Row>
        </Container>
    </header>
  </BudgetAppSection>;
}

export default BidAsk;