import classes from "./CardComponent.module.scss";
import userPageClasses from "../../../Pages/user/userPage.module.scss";
import Card from "react-bootstrap/Card";

function CardComponent({ children }) {
  return (
    <Card
      className={`${userPageClasses.card_info} h-100 shadow`}
      border="light"
    >
      <Card.Body className="d-flex flex-column">{children}</Card.Body>
    </Card>
  );
}

export default CardComponent;
