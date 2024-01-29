import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import classes from "./TableExpensesModal.module.scss";
import { calculateDateDifference } from "../../../../utils/countDifferencesInDays";
import Badge from "react-bootstrap/Badge";
import { MdOutlineUpdate } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { RiEmotionHappyLine } from "react-icons/ri";

function TableExpensesModal({
  show,
  handleClose,
  filterIdData,
  modal,
  handleDeadlineDate,
  formData,
  handleInputChange,
  editUpdateData,
  isChecked,
  handleInputChecboxPaid,
  updateData,
  deleteData,
}) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      className={classes.modal}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{filterIdData[0].name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xs={12} md={6}>
            <p>
              <span className={classes.modal_description}>category:</span>
              {filterIdData[0].category}
            </p>
          </Col>
          <Col xs={12} md={6}>
            <p>
              {" "}
              <span className={classes.modal_description}>value:</span>
              {filterIdData[0].expenses}
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            {" "}
            <p>
              <span className={classes.modal_description}>date:</span>
              {filterIdData[0].fullDate}
            </p>
          </Col>
          <Col xs={12} md={6}>
            {" "}
            <p>
              <span className={classes.modal_description}>deadline:</span>
              {filterIdData[0].deadline === "on" ? "yes" : "no"}
            </p>
          </Col>
        </Row>{" "}
        {}
        {filterIdData[0].deadline === "on" && (
          <Row>
            <Col xs={12}>
              {" "}
              <p>
                <span className={classes.modal_description}>
                  deadline date:
                </span>
                {filterIdData[0].deadlineDate}
                <span className={classes.modal_icon}>
                  {" "}
                  {filterIdData[0].deadlineDate !== "" &&
                    calculateDateDifference(filterIdData[0].deadlineDate) <=
                      3 &&
                    calculateDateDifference(filterIdData[0].deadlineDate) >
                      0 && (
                      <MdOutlineUpdate
                        size={20}
                        className={classes.icon_time}
                      />
                    )}
                  {filterIdData[0].deadlineDate !== "" &&
                    calculateDateDifference(filterIdData[0].deadlineDate) >
                      3 && (
                      <MdOutlineUpdate
                        size={20}
                        className={classes.icon_long_time}
                      />
                    )}
                  {filterIdData[0].deadlineDate !== "" &&
                    calculateDateDifference(filterIdData[0].deadlineDate) <=
                      0 && (
                      <>
                        <Badge bg="dark" text="danger">
                          {" "}
                          <MdOutlineUpdate
                            size={20}
                            className={classes.icon_danger}
                          />
                          {calculateDateDifference(
                            filterIdData[0].deadlineDate
                          ) === 0 && (
                            <span>the payment deadline expires !!!</span>
                          )}{" "}
                          {calculateDateDifference(
                            filterIdData[0].deadlineDate
                          ) < 0 && (
                            <span>
                              {calculateDateDifference(
                                filterIdData[0].deadlineDate
                              )}{" "}
                              days after the payment due date
                            </span>
                          )}
                        </Badge>
                      </>
                    )}
                  {calculateDateDifference(filterIdData[0].deadlineDate) >
                    0 && (
                    <Badge bg="warning">
                      <span>
                        {calculateDateDifference(filterIdData[0].deadlineDate)}{" "}
                        days before the payment due date
                      </span>
                    </Badge>
                  )}
                </span>
              </p>
            </Col>
          </Row>
        )}
        {modal === "deadline" && (
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Date deadline</Form.Label>
            <Form.Control
              onChange={handleDeadlineDate}
              type="date"
              name="date"
              placeholder=""
            />
          </Form.Group>
        )}
        {modal === "edit" && (
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Edit name expenses</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleInputChange}
                name="name"
                size="lg"
              />
              <Form.Text className="text-muted">
                Edit your name expenses
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Edit expenses value</Form.Label>
              <Form.Control
                type="number"
                placeholder="Expenses"
                name="expenses"
                value={formData.expenses}
                onChange={handleInputChange}
                size="lg"
                min="0"
              />
              <Form.Text className="text-muted">Edit value</Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Edit category</Form.Label>
              <Form.Select
                onChange={handleInputChange}
                name="category"
                value={formData.category}
              >
                <option value="">Category</option>
                <option value="home">Home</option>
                <option value="credits">Credits</option>
                <option value="car">Car</option>
                <option value="education">Education</option>
                <option value="other">Other</option>
              </Form.Select>
              <Form.Text className={classes.formTextCustom}>
                Edit your category
              </Form.Text>
            </Form.Group>
            <Form.Check
              type="switch"
              id="custom-switch"
              label={formData.deadline === "on" ? "Deadline" : "Not deadline"}
              name="deadline"
              checked={formData.deadline === "on"}
              onChange={handleInputChange}
              
            />
            <Button
              onClick={() => {
                editUpdateData();
              }}
              size="lg"
              variant="primary"
              disabled={
                formData.name === "" ||
                formData.expenses === 0 ||
                formData.category === ""
              }
            >
              Save Changes
            </Button>{" "}
          </Form>
        )}
        {modal === "select-paid" && (
          <>
            {filterIdData[0].deadline === "on" ? (
              <Form.Group className={classes.modal_check_bill}>
                {" "}
                <Form.Label>Check if the bill has been paid</Form.Label>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  //checked? label={"on"}:label={"off"}
                  checked={isChecked}
                  label={
                    isChecked ? (
                      <span>
                        Bill paid <FaCheck className={classes.icon_check} />
                      </span>
                    ) : (
                      "Bill not paid"
                    )
                  }
                  name="deadline"
              onChange={handleInputChecboxPaid}
                />
              </Form.Group>
            ) : (
              <h3>
                Great, looks like this bill has already been paid
                <RiEmotionHappyLine size="" color="yellow" />
              </h3>
            )}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {modal === "deadline" && (
          <Button variant="primary" onClick={() => updateData()}>
            Save deadline
          </Button>
        )}{" "}
        {modal === "select-paid" && (
          <Button variant="primary" onClick={() => editUpdateData()}>
            Save
          </Button>
        )}
        {modal === "delete" && (
          <Button variant="danger" onClick={() => deleteData()}>
            Delete
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default TableExpensesModal;
