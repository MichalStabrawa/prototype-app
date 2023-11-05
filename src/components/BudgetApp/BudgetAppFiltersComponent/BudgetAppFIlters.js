import { useState, useReducer } from "react";

import classes from "./BudgetAppFilters.module.scss";

const BudgetAppFilters = (props) => {
  const [data, setData] = useState(props.data);
const {salaryOnChange} = props
  return (
    <div className={classes.filters}>
      <select className={classes.select} onChange={salaryOnChange}>
        <option value="">Date</option>
        {data && data.map((el,index)=>(<option key={index} value={el.date}>{el.date}</option>) )}
      </select>
    </div>
  );
};

export default BudgetAppFilters;
