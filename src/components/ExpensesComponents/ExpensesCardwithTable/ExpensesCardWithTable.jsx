import { useEffect, useState } from "react";
import classes from "./ExpnesesCardWithTable.module.scss";
import Card from "react-bootstrap/Card";
import TableExpenses from "../../Table/TableExpenses/TableExpenses";
import Badge from "react-bootstrap/Badge";
import { filterSearchData } from "../../../utils/filterInsideAccordion";
import { sortSalaryExpenses } from "../../../utils/sortSalaryExpenses";
import { filterSearchInputDate } from "../../../utils/filterDateAcordion";

function ExpensesCardWithTable({ badgeData, data, statusExpenses, title }) {
  const [dataFilter, setDataFilter] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRadio, setSelectedRadio] = useState(null);
  const [searchDate, setSearchDate] = useState("");
  const [isCheckedFilter, setCheckedFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentRecords = dataFilter
    ? dataFilter.slice(indexOfFirstRecord, indexOfLastRecord)
    : [];
  const nPages =
    dataFilter && dataFilter.length
      ? Math.ceil(data.length / recordsPerPage)
      : 0;

  console.log("DATA CurrentRecords");
  console.log(currentRecords);

  console.log("NpAgeswitTable:" + nPages);
  console.log("DataFilter ExcpensesTab");
  console.log(dataFilter);
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
      console.log("DataUSE");
      console.log(data);
      setDataFilter(data);
    }
  }, [statusExpenses]);

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
  return (
    <Card border="light" className="h-100">
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
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default ExpensesCardWithTable;
