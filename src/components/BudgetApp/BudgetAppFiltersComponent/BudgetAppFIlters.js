import { useState, useReducer } from "react";

import classes from './BudgetAppFilters.module.scss'



const BudgetAppFilters = (props) => {
    return (
        <div className={classes.filters}>
            <select><option value="">Date</option></select>
        </div>

    )
}

export default BudgetAppFilters