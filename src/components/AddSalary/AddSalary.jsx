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
import { fetchUserSalary } from "../../store/fetchUserData/fetchUserSalary";

const AddSalary = () => {
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
    expenses: "",
    id: null,
  });
  const [tableData, setTableData] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);

  console.log(tableData);

  console.log(user);
  const handleInputChange = (e) => {
    const uniqueId = uuidv4();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value, id: uniqueId });
    setOpenAlert(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTableData((prev) => [...prev, formData]);
    setFormData({
      name: "",
      expenses: "",
      id: null,
    });
  };

  const countTableValue = () => {
    const sum = tableData.reduce((prev, cur) => {
      return prev + +cur.expenses;
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
    console.log(e.target.dataset.id);
    const deleted = [...tableData].filter((el) => el.id !== id);
    setTableData(deleted);
  };

  const handleAddData = () => {
    if (user) {
      const dataRef = database.ref(`users/${user.uid}/salary/`);

      // Add data to the real-time database
      dataRef.push(tableData);
      console.log("Save DATA");
      console.log(tableData);
      // Clear the data input fields after adding
      setData({ name: "", date: "", uniqueId: "", value: "" });
      setTableData([]);
      setOpenAlert(true);
      dispatch(fetchUserSalary({ auth: auth, database: database }));
    }
  };

  const closeAlert = () => {
    setOpenAlert(false);
  };

  return (
    <div>
      <>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name salary</Form.Label>
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
            <Form.Label>Add Expenses</Form.Label>
            <Form.Control
              type="number"
              placeholder="Expenses"
              name="expenses"
              value={formData.expenses}
              onChange={handleInputChange}
              size="lg"
            />
            <Form.Text className="text-muted">Add value</Form.Text>
          </Form.Group>
          <Button size="lg" variant="primary" type="submit">
            Add expenses
          </Button>{" "}
          <Button
            size="lg"
            variant="outline-primary"
            onClick={handleAddData}
            disabled={!tableData.length}
          >
            Save expenses
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
              sum of value: {countTableValue()}
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
    </div>
  );
};

export default AddSalary;
