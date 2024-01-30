import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import classes from "./ExpnesesCardWithTable.module.scss";
import Card from "react-bootstrap/Card";
import TableExpenses from "../../Table/TableExpenses/TableExpenses";
import Badge from "react-bootstrap/Badge";
import { filterSearchData } from "../../../utils/filterInsideAccordion";
import { sortSalaryExpenses } from "../../../utils/sortSalaryExpenses";
import { filterSearchInputDate } from "../../../utils/filterDateAcordion";
import { auth, database } from "../../../firebase/firebase";
import { fetchUserExpenses } from "../../../store/fetchUserData/fetchUserExpenses";

function ExpensesCardWithTable({
  badgeData,
  data,
  statusExpenses,
  title,
  countPercent,
  percent,
  counter
}) {
  const dispatch = useDispatch();
  const [dataFilter, setDataFilter] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRadio, setSelectedRadio] = useState(null);
  const [searchDate, setSearchDate] = useState("");
  const [isCheckedFilter, setCheckedFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [flag, setFlag] = useState(false);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentRecords = dataFilter
    ? dataFilter.slice(indexOfFirstRecord, indexOfLastRecord)
    : [];
  const nPages =
    dataFilter && dataFilter.length
      ? Math.ceil(data.length / recordsPerPage)
      : 0;

  const user = auth.currentUser;
  console.log(`Count percent ${typeof countPercent}`);
  const executeSetFlag = (flag) => {
    setFlag(flag);
  };
  //filter data
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
    setCheckedFilter(!isCheckedFilter);
  };
  useEffect(() => {
    if (statusExpenses === "success" && data) {
      setDataFilter(data);
    }
  }, [statusExpenses, badgeData, data]);

  useEffect(() => {
    if (data) {
      filterSearchData(isCheckedFilter, data, search, setDataFilter);
    }
  }, [search]);

  useEffect(() => {
    if (data) {
      sortSalaryExpenses(data, selectedRadio, setDataFilter);
    }
  }, [selectedRadio]);

  useEffect(() => {
    if (searchDate !== "") {
      if (data) {
        filterSearchInputDate(data, searchDate, setDataFilter);
      }
    }
  }, [searchDate]);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserExpenses({ auth: auth, database: database }));

      setFlag(false);
    }
  }, [flag, dispatch, user]);
  return (
    <Card border="light" className="h-100 shadow">
      <Card.Header>
        <Card.Title>
          {title}
          <Badge bg="danger">{badgeData && badgeData}</Badge>
        </Card.Title>
      </Card.Header>
      <Card.Body className="d-flex flex-column">
        {data && currentRecords && (
          <TableExpenses
            setCurrentPage={setCurrentPage}
            nPages={nPages}
            currentRecords={currentRecords}
            currentPage={currentPage}
            data={dataFilter}
            status={statusExpenses}
            responsive="sm"
            striped
            hover
            radioChecked={radioChecked}
            handleSearchInput={handleSearchInput}
            handleSwitchToggle={handleSwitchToggle}
            isCheckedFiltr={isCheckedFilter}
            flagExpenses={executeSetFlag}
            counter={counter}
          />
        )}

        {percent && (
          <Card.Text className={classes.card_text}>
            <Badge size="md" bg="warning">
              {countPercent !== null && countPercent !== undefined
                ? `${countPercent}%`
                : "N/A"}
            </Badge>{" "}
            <span>bills for all expenses are due on the due date !!!</span>
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  );
}

export default ExpensesCardWithTable;
