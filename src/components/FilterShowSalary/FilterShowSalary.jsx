import { useState, useEffect } from "react";
import classes from "./FilterShowSalary.module.scss";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FaSearch ,FaFilter } from "react-icons/fa";

function FilterShowSalary() {
  return (
    <div className={classes.filter_wrapper}>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Filters <span className={classes.filter_icon}><FaFilter/></span></Accordion.Header>
          <Accordion.Body>
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-sm">
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
              />
            </InputGroup>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default FilterShowSalary;
