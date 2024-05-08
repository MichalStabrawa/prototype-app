import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth, database } from "../../firebase/firebase";
import { v4 as uuidv4 } from "uuid";
import classes from "./AddSalary.module.scss";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import CloseButton from "react-bootstrap/CloseButton";
import Badge from "react-bootstrap/Badge";
import { fetchUserSalary } from "../../store/fetchUserData/fetchUserSalary";
import getCurrentDate from "../../utils/dateFunction";
import { getMonthYear } from "../../utils/dateFunction";
import { categorySalaryOption } from "../../helpers/variables";
import ModalBapp from "../Modal/ModalBapp";

const AddSalary = ({ sectionRef }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [data, setData] = useState({
    name: "",
    date: "",
    uniqueId: "",
    value: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    expenses: 0,
    category: "",
    id: null,
    fullDate: "",
    monthYear: "",
  });
  const [tableData, setTableData] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    const uniqueId = uuidv4();
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "expenses" ? +value : value.toUpperCase(),
      id: uniqueId,
      fullDate: getCurrentDate(),
      monthYear: getMonthYear(),
    }));
    setData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "expenses" ? +value : value,
      id: uniqueId,
      fullDate: getCurrentDate(),
      monthYear: getMonthYear(),
    }));
    setOpenAlert(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTableData((prev) => [...prev, formData]);
    setFormData({
      name: "",
      expenses: 0,
      category: "",
      id: null,
      fullDate: "",
      monthYear: "",
    });
  };

  const countTableValue = () => {
    const sum = tableData.reduce((prev, cur) => {
      return prev + cur.expenses;
    }, 0);

    return sum;
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignIn = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  const handleDeletedExpense = (e) => {
    const id = e.target.dataset.id;

    const deleted = [...tableData].filter((el) => el.id !== id);
    setTableData(deleted);
  };

  const handleAddData = () => {
    if (user) {
      const dataRef = database.ref(`users/${user.uid}/salary/`);

      // Add data to the real-time database
      dataRef.push(tableData);
      console.log("Save DATA salary");

      // Clear the data input fields after adding
      setData({
        name: "",
        expenses: 0,
        category: "",
        id: null,
        fullDate: "",
        monthYear: "",
      });
      setTableData([]);
      setOpenAlert(true);
      dispatch(fetchUserSalary({ auth: auth, database: database }));
    }
  };

  const closeAlert = () => {
    setOpenAlert(false);
  };

  return (
    <div className={classes.salary} ref={sectionRef}>
      <>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Add name salary</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleInputChange}
              name="name"
              size="lg"
            />
            <Form.Text className="text-muted">
              Add your name salary, bonuses or other income
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Add salary value</Form.Label>
            <Form.Control
              type="number"
              placeholder="Revenue"
              name="expenses"
              value={formData.expenses}
              onChange={handleInputChange}
              size="lg"
              min="0"
            />
            <Form.Text className="text-muted">Add value</Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Add category</Form.Label>
            <Form.Select onChange={handleInputChange} name="category">
              <option value="">Category</option>
              {categorySalaryOption.map((el, index) => (
                <option key={index} value={el.value}>
                  {el.label}
                </option>
              ))}
            </Form.Select>
            <Form.Text className={classes.formTextCustom}>
              Add your name salary, bonuses or other income
            </Form.Text>
            <Button variant="primary" onClick={handleShow}>
              +
            </Button>
          </Form.Group>
          <Button
            size="lg"
            variant="primary"
            type="submit"
            disabled={
              formData.name === "" ||
              formData.expenses === 0 ||
              formData.category === ""
            }
          >
            Add +
          </Button>{" "}
          <Button
            size="lg"
            variant="outline-success"
            onClick={handleAddData}
            disabled={!tableData.length}
          >
            Save
          </Button>
        </Form>
        {openAlert && (
          <div className={classes.alert}>
            <Alert variant="success">
              <span className={classes.alert_span}>
                save success!!!
                <CloseButton onClick={closeAlert} />
              </span>{" "}
            </Alert>
          </div>
        )}

        <div className={classes.table}>
          {tableData.length > 0 && (
            <div>
              sum of value: <Badge bg="secondary">{countTableValue()}</Badge>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th> Name salary</th>
                    <th>expenses value</th>
                    <th>delete</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((el, index) => {
                    return (
                      <tr key={el.id}>
                        <td>{el.name}</td>
                        <td>{el.expenses}</td>
                        <td>
                          <Button
                            variant="danger"
                            data-id={el.id}
                            onClick={handleDeletedExpense}
                          >
                            X
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      </>
      <ModalBapp show={show} handleClose={handleClose} />
    </div>
  );
};

export default AddSalary;
