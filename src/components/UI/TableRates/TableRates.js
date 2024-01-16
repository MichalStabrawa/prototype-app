import { useState, useEffect } from "react";
import classes from "./TableRates.module.scss";
import IconArrow from "../iconArrow/iconArrow";
import getCurrentPrevDifferences from "../../../utils/getCurrentPrevDifferences";
import getCompareLastActualValue from "../../../utils/getCurrentLastValue";
import { Link } from "react-router-dom";
import Pagination from "../../Paggination/Pagination";
import { MdReadMore } from "react-icons/md";
import Button from "react-bootstrap/Button";

const TableRates = (props) => {
  const data = props.data;
  const [tabData, setTabData] = useState([]);
  const [effectiveDate, setEffectiveDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [recordsPerPage] = useState(15);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentRecords = tabData.slice(indexOfFirstRecord, indexOfLastRecord);

  const nPages = Math.ceil(tabData.length / recordsPerPage);

  useEffect(() => {
    setEffectiveDate(data[1].effectiveDate);
  }, [data]);

  useEffect(() => {
    if (data.length > 0) {
      const tab = getCompareLastActualValue(data[1].rates, data[0].rates);
      setTabData(tab);
    }
  }, [data]);

  return (
    <>
      <div className={classes.table_rates}>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>code</th>
              <th className={classes.currency}>currency</th>
              <th>value</th>
              <th>rate arrow</th>
              <th className={classes.rate}>rate</th>
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
                    <td>{el.mid}</td>
                    <td>
                      <IconArrow
                        arrow={getCurrentPrevDifferences(el.mid, el.lastValue)}
                      />
                    </td>
                    <td
                      className={`${classes.rate} ${
                        classes[getCurrentPrevDifferences(el.mid, el.lastValue)]
                      }`}
                    >
                      {(el.mid - el.lastValue).toFixed(4)}
                    </td>
                    <td className={classes.date}>{effectiveDate}</td>
                    <td>
                      <Link to={`/exchange/${el.code}`}>
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
        </table>
        <Pagination
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};

export default TableRates;
