import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import classes from "./ShowSavedExpenses.module.scss";
import { auth } from "../../firebase/firebase";
import Table from "react-bootstrap/Table";
import Pagination from "../Paggination/Pagination";
import { FaUser } from "react-icons/fa";
import Badge from "react-bootstrap/Badge";
import FilterShowSalary from "../FilterShowSalary/FilterShowSalary";
import { filterSearchData } from "../../utils/filterInsideAccordion";
import { FaCalendarPlus, FaCalendarTimes } from "react-icons/fa";

import { sortSalaryExpenses } from "../../utils/sortSalaryExpenses";
import { filterSearchInputDate } from "../../utils/filterDateAcordion";
import { filterMonthData } from "../../utils/filterMonth";

function ShowSavedExpenses({ title, filter, monthYear }) {
  const dataSaved = useSelector((state) => state.fetchUserExpenses.data);
  const status = useSelector((state) => state.fetchUserExpenses.status);
  const isLoading = useSelector((state) => state.fetchUserExpenses.isLoading);
  const error = useSelector((state) => state.fetchUserExpenses.error);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState(null);
  const [searchDate, setSearchDate] = useState("");
  const [dataMonth, setDataMonth] = useState([]);

  console.log("DATAMONTH EXPESES");
  console.log(dataMonth);
  console.log(data);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

  console.log("CurrentRecExpense");
  console.log(currentRecords);

  const nPages = Math.ceil(data.length / recordsPerPage);

  const logInUser = auth.currentUser;

  const countSumOfSalary = () => {
    const sum = [...dataMonth].reduce((prev, curr) => {
      return prev + +curr.expenses;
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
    filterSearchData(isChecked, dataMonth, search, setData);
  }, [search]);

  useEffect(() => {
    sortSalaryExpenses(data, selectedRadio, setData);
  }, [selectedRadio]);

  useEffect(() => {
    if (searchDate !== "") {
      filterSearchInputDate(dataMonth, searchDate, setData);
    }
  }, [searchDate]);

  useEffect(() => {
    filterMonthData(dataSaved, status, monthYear, setDataMonth);
  }, [monthYear, dataSaved, status]);

  useEffect(() => {
    if (status === "success" && monthYear) {
      setData(dataMonth);
    }
  }, [status, monthYear, dataMonth,data]);

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
          {searchDate}
          <div className={classes.filter}>
            <FilterShowSalary
              change={handleSearchInput}
              filter={filter}
              isChecked={isChecked}
              handleCheckbox={handleSwitchToggle}
              radioChecked={radioChecked}
              selectedRadio={selectedRadio}
            />
          </div>
          <div>
            {" "}
            <Table responsive="sm" striped hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th> Name</th>
                  <th>Value</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Deadline</th>
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
                        <td>
                          {el.deadline === "on" && (
                            <FaCalendarTimes
                              size={20}
                              className={classes.icon_off}
                            />
                          )}
                          {el.deadline === "off" && (
                            <FaCalendarPlus
                              size={20}
                              className={classes.icon_on}
                            />
                          )}{" "}
                        </td>
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

export default ShowSavedExpenses;
