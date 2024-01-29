import { useEffect, useState } from "react";
import classes from "./ExpnesesCardWithTable.module.scss";
import Card from "react-bootstrap/Card";
import TableExpenses from "../../Table/TableExpenses/TableExpenses";
import Badge from "react-bootstrap/Badge";

function ExpensesCardWithTable({ badgeData, data, statusExpenses, title }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentRecords = data
    ? data.slice(indexOfFirstRecord, indexOfLastRecord)
    : [];
    const nPages = data && data.length ? Math.ceil(data.length / recordsPerPage) : 0;

  console.log("CurrentRecords");
  console.log(currentRecords);


 
  console.log("NpAgeswitTable:" + nPages);



  return (
    <Card border="light" className="h-100">
      <Card.Header>
        <Card.Title>
          {title}
          <Badge bg="danger">{badgeData && badgeData}</Badge>
        </Card.Title>
      </Card.Header>
      <Card.Body className="d-flex flex-column">
        {data && nPages&& currentPage&&(
          <TableExpenses
            setCurrentPage={setCurrentPage}
            nPages={nPages}
            currentRecords={currentRecords}
            currentPage={currentPage}
            data={data}
            status={statusExpenses}
            responsive="sm"
            striped
            hover
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default ExpensesCardWithTable;
