import { useState } from 'react';
import InputComponent from '../UI/Input/InputComponent';
import Button from '../UI/Button/Button';

import classes from './BudgetAppComponent.module.scss';

const BudgetAppComponent = (props) => {
    const [summary, changeSummary] = useState(undefined)
    const [state, changeState] = useState();
    const [value, changeValue] = useState();

    const addHandlerSalaryName = (e) => {
        let salary = e.target.value;

        changeState(salary);
    }
    const addHandlerSalaryValue = (e) => {
        let salaryValue = e.target.value;

        changeValue(salaryValue);
    }

    const addNameAndSalary = () => {
        let tab = { name: state, value: value }
        if (summary === undefined) {
            changeSummary([tab])

        } else {
            changeSummary([...summary, tab])
        }
    }
    return (
        <section className={classes.budgetapp}>
            <h2>Add Salary</h2>

            <InputComponent name='Name' type='text' action={addHandlerSalaryName} />
            <InputComponent name='Salary' type='number' action={addHandlerSalaryValue} />
            <Button name='Add' click={addNameAndSalary} />
            <p>{state} {value}</p>


        </section>
    )
}

export default BudgetAppComponent;