import { useState } from "react";
import { useSelector } from "react-redux";
import classes from "./ShowSavedExpenses.module.scss";
import { auth } from "../../firebase/firebase";
import Table from "react-bootstrap/Table";
import Pagination from "../Paggination/Pagination";
import { FaUser } from "react-icons/fa";
import Badge from 'react-bootstrap/Badge';

function ShowSavedExpenses({title}) {
  const { data, status, isLoading, error } = useSelector(
    (state) => state.fetchUserExpenses
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

  const nPages = Math.ceil(data.length / recordsPerPage);

  const logInUser = auth.currentUser;

  const countSumOfSalary = () => {
    const sum = [...data].reduce((prev, curr) => {
      return prev + +curr.expenses;
    }, 0);

    return sum;
  };
  console.log('DATA SAVED EXPENSES');
 console.log(data)
  return (
    <div>
      <p>{title}</p>
      {logInUser && (
        <p className={classes.user}>
          <FaUser className={classes.user_icon}/>
          {logInUser.email}
        </p>
      )}
      <div>
        <p className={classes.count}>
          <span>sum of value:</span> <Badge bg="info"><h5>{countSumOfSalary()} PLN</h5></Badge>
        </p>
      </div>
      {status === "success" && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th> Name</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              currentRecords.map((el, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{el.name}</td>
                    <td>{el.expenses}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      )}
      {nPages > 0 && (
        <Pagination
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}

export default ShowSavedExpenses;