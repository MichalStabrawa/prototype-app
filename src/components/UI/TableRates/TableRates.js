import classes from "./TableRates.module.scss";

const TableRates = (props) => {
  const { data ,effectiveDate,table} = props;

  return (
    <div className={classes.table_rates}>
      <p>
        TABLE: {table} <span className={classes.date}>date: {effectiveDate}</span>
      </p>
      <table>
        <thead>
          <tr>
            <th>code</th>
            <th>currency</th>
            <th>value</th>
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
                    {el.state === "+" && <span className="grow">+</span>}
                    {el.state === "-" && <span className="falls">-</span>}
                    {el.state === "=" && <span className="equal">=</span>}
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
