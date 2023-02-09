import { useState, useReducer } from "react";

import classes from './BudgetAppFilters.module.scss'

import Select from "../../UI/Select/Select";

const BudgetAppFilters = (props) => {
    return (
        <div className={classes.filter}>
            <Select>
                <option>Date</option>
            </Select>
        </div>

    )
}

export default BudgetAppFilters