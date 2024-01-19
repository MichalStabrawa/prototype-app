import { useState, useEffect } from "react";
import classes from "./FilterShowSalary.module.scss";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FaSearch, FaFilter } from "react-icons/fa";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function FilterShowSalary({ change, filter, isChecked, handleCheckbox,radioChecked ,selectedRadio}) {
  return (
    <>
      {" "}
      {filter && (
        <div className={classes.filter_wrapper}>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                Filters{" "}
                <span className={classes.filter_icon}>
                  <FaFilter />
                </span>
              </Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col>
                    {" "}
                    <InputGroup size="sm" className="mb-3">
                      <InputGroup.Text id="inputGroup-sizing-sm">
                        <FaSearch />
                      </InputGroup.Text>
                      <Form.Control
                        onChange={change}
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                      />
                    </InputGroup>
                    <Form>
                      <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        label={isChecked ? "Search by value" : "Search by name"}
                        checked={isChecked}
                        onChange={handleCheckbox}
                      />
                    </Form>
                  </Col>
                  <Col>
                    <p>SORT BY</p>
                    <Form>
                    <Form.Check
                  type="radio"
                  aria-label="radio 1"
                  label="A-Z"
                  name="az"
                  value="az"
                  checked={selectedRadio === 'az'}
                  onChange={radioChecked}
                />
                <Form.Check
                  type="radio"
                  aria-label="radio 1"
                  label="Z-A"
                  name="za"
                  value="za"
                  checked={selectedRadio === 'za'}
                  onChange={radioChecked}
                />
                    </Form>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      )}
    </>
  );
}

export default FilterShowSalary;
