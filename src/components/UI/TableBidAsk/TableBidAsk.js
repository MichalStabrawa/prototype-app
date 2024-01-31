import classes from "./TableBidAsk.module.scss";

import { useState, useEffect } from "react";

import Pagination from "../../Paggination/Pagination";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { MdReadMore } from "react-icons/md";

import Table from "react-bootstrap/Table";

const TableBidAsk = ({ data }) => {
  const [tabData, setTabData] = useState([]);
  const [effectiveDate, setEffectiveDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [recordsPerPage] = useState(15);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentRecords = data[0].rates.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const nPages = Math.ceil(tabData.length / recordsPerPage);

  useEffect(() => {
    setEffectiveDate(data[0].effectiveDate);
  }, [data]);

  return (
    <>
      <div className={classes.table_rates}>
        <h3>
          TABLE: {data[0].table}
          <span className={classes.date}>
            {" "}
            , date: {effectiveDate}, no: {data[0].no}, trading date:{" "}
            {data[0].tradingDate}
          </span>
        </h3>
        <Table responsive="lg" striped hover>
          <thead>
            <tr>
              <th>code</th>
              <th className={classes.currency}>currency</th>
              <th>value bid</th>
              <th>value ask</th>
              <th>date</th>
              <th>link</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              currentRecords.map((el, index) => {
                return (
                  <tr key={index}>
                    <td className={classes.code}>{el.code}</td>
                    <td className={classes.currency}>{el.currency}</td>
                    <td className={classes.bid}>{el.bid}</td>
                    <td className={classes.ask}>{el.ask}</td>
                    <td className={classes.date}>{effectiveDate}</td>
                    <td>
                      <Link to={`/bidask/${el.code}`}>
                        {" "}
                        <Button variant="link">
                          more <MdReadMore />
                        </Button>{" "}
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        {nPages > 0 && (
          <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </>
  );
};

export default TableBidAsk;
