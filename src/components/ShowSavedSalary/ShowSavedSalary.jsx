import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import classes from "./ShowSavedSalary.module.scss";
import { auth } from "../../firebase/firebase";
import Table from "react-bootstrap/Table";
import Pagination from "../Paggination/Pagination";
import { FaUser } from "react-icons/fa";
import Badge from "react-bootstrap/Badge";
import FilterShowSalary from "../FilterShowSalary/FilterShowSalary";
import { filterSearchData } from "../../utils/filterInsideAccordion";
import { sortSalaryExpenses } from "../../utils/sortSalaryExpenses";
import { filterSearchInputDate } from "../../utils/filterDateAcordion";

function ShowSavedSalary({ title, filter }) {
  const dataSaved = useSelector((state) => state.fetchUserSalary.data);
  const status = useSelector((state) => state.fetchUserSalary.status);
  const isLoading = useSelector((state) => state.fetchUserSalary.isLoading);

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState(null);
  const [searchDate, setSearchDate] = useState("");
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

  const nPages = Math.ceil(data.length / recordsPerPage);

  const logInUser = auth.currentUser;

  const countSumOfSalary = () => {
    const sum = [...dataSaved].reduce((prev, curr) => {
      return prev + curr.expenses;
    }, 0);

    return sum;
  };

  const radioChecked = (event) => {
    setSelectedRadio(event.target.value);
  };

  const handleSearchInput = (e) => {
    if (e.target.name === "search") {
      setSearch(e.target.value);
    }
    if (e.target.name === "date") {
      setSearchDate(e.target.value);
    }
  };

  const handleSwitchToggle = () => {
    setChecked(!isChecked);
  };

  useEffect(() => {
    if (status === "success") {
      setData(dataSaved);
    }
  }, [status]);

  useEffect(() => {
    filterSearchData(isChecked, dataSaved, search, setData);
  }, [search]);

  useEffect(() => {
    sortSalaryExpenses(data, selectedRadio, setData);
  }, [selectedRadio]);

  useEffect(() => {
    if (searchDate !== "") {
      filterSearchInputDate(dataSaved, searchDate, setData);
    }
  }, [searchDate]);

  return (
    <div>
      <p>{title}</p>
      {logInUser && (
        <p className={classes.user}>
          <FaUser className={classes.user_icon} />
          {logInUser.email}
        </p>
      )}
      <div>
        <p className={classes.count}>
          <span>sum of value:</span>{" "}
          <Badge bg="info">
            <h5>{countSumOfSalary()} PLN</h5>
          </Badge>
        </p>
      </div>

      {status === "success" && (
        <>
          <div className={classes.filter}>
            {searchDate}
            <FilterShowSalary
              filter={filter}
              change={handleSearchInput}
              isChecked={isChecked}
              handleCheckbox={handleSwitchToggle}
              radioChecked={radioChecked}
              selectedRadio={selectedRadio}
            />
          </div>
          {search}
          <div>
            {" "}
            <Table responsive="sm" striped hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th> Name</th>
                  <th>Value</th>
                  <th>Category</th>
                  <th>Data</th>
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
                        <td>{el.category}</td>
                        <td>{el.fullDate}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        </>
      )}
      {nPages > 0 && data.length > 10 && (
        <Pagination
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}

export default ShowSavedSalary;
