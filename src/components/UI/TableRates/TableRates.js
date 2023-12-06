import classes from "./TableRates.module.scss";
import IconArrow from "../iconArrow/iconArrow";
import getCurrentPrevDifferences from "../../../utils/getCurrentPrevDifferences";

const TableRates = (props) => {
  const { data, effectiveDate, table } = props;

  return (
    <div className={classes.table_rates}>
      <p>
        TABLE: {table}{" "}
        <span className={classes.date}>
          date: {effectiveDate && effectiveDate}
        </span>
      </p>
      <table>
        <thead>
          <tr>
            <th>code</th>
            <th>currency</th>
            <th>value</th>
            <th>rate arrow</th>
            <th>rate</th>
            <th>date</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((el, index) => {
              return (
                <tr key={index}>
                  <td>{el.code}</td>
                  <td>{el.currency}</td>
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
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default TableRates;
