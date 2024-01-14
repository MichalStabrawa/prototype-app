import React, { useState, useEffect } from "react";
import { auth, database } from "../../firebase/firebase";
import { v4 as uuidv4 } from "uuid";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

const TestFirebase = () => {
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

  console.log(user);
  const handleInputChange = (e) => {
    const uniqueId = uuidv4();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value, id: uniqueId });
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

  const handleDataToTable = (e) => {};

  const handleAddData = () => {
    if (user) {
      const { name, date, value } = data;
      const dataRef = database.ref(`users/${user.uid}/salary/`);

      // Add data to the real-time database
      dataRef.push(tableData);
      console.log("Save DATA");
      console.log(tableData);
      // Clear the data input fields after adding
      setData({ name: "", date: "", uniqueId: "", value: "" });
      setTableData([]);
    }
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
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
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
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add
          </Button>{" "}
          <Button
            variant="info"
            onClick={handleAddData}
            disabled={!tableData.length}
          >
            Save 1
          </Button>
        </Form>

        <div>
          {tableData.length > 0 && (
            <Table striped="columns">
              <thead>
                <tr>
                  <th> Name salary</th>
                  <th>expenses value</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((el, index) => {
                  return (
                    <tr key={el.id}>
                      <td>{el.name}</td>
                      <td>{el.expenses}</td>
                      <td>
                        <Button data-id={el.id}>X</Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
          <ul>
            {tableData.length > 0 &&
              tableData.map((element) => (
                <li key={element.id}>
                  {element.name} {element.expenses} {element.id}
                </li>
              ))}
          </ul>
        </div>
      </>
    </div>
  );
};

export default TestFirebase;
