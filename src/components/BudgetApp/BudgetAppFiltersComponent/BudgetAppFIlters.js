import { useState, useReducer } from "react";

import classes from "./BudgetAppFilters.module.scss";

const BudgetAppFilters = (props) => {
  const [data, setData] = useState(props.data);

  return (
    <div className={classes.filters}>
      <select className={classes.select}>
        <option value="">Date</option>
        {data && data.map((el,index)=>(<option key={index}>{el.date}</option>) )}
      </select>
    </div>
  );
};

export default BudgetAppFilters;
