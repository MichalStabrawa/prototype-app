import classes from "./TableBidAsk.module.scss";

import { useState, useEffect } from "react";

import IconArrow from "../iconArrow/iconArrow";
import getCurrentPrevDifferences from "../../../utils/getCurrentPrevDifferences";
import getCompareLastActualValue from "../../../utils/getCurrentLastValue";
import { Link } from "react-router-dom";
import Pagination from "../../Paggination/Pagination";
import { MdReadMore } from "react-icons/md";
import Button from "react-bootstrap/Button";

const TableBidAsk = ({ data }) => {
  const [tabData, setTabData] = useState([]);
  const [effectiveDate, setEffectiveDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [recordsPerPage] = useState(15);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  console.log(
    `indexOfLastRecord: ${indexOfLastRecord}, indexOfFirstRecord: ${indexOfFirstRecord}`
  );

  const currentRecords = data[0].rates.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  console.log(currentRecords);

  const nPages = Math.ceil(tabData.length / recordsPerPage);

  console.log("bidAsk data");
  console.log(data);

  useEffect(() => {
    setEffectiveDate(data[0].effectiveDate);
  }, [data]);

  return (
    <>
      <div className={classes.table_rates}>
        <h3>
          TABLE: {data[0].table}{" "}
          <span className={classes.date}>date: {effectiveDate}</span>
        </h3>
        <table>
          <thead>
            <tr>
              <th>code</th>
              <th className={classes.currency}>currency</th>
              <th>value bid</th>
              <th>value ask</th>

              <th>date</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              currentRecords.map((el, index) => {
                return (
                  <tr key={index}>
                    <td className={classes.code}>{el.code}</td>
                    <td className={classes.currency}>{el.currency}</td>
                    <td>{el.bid}</td>
                    <td>{el.ask}</td>
                    <td className={classes.date}>{effectiveDate}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
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
