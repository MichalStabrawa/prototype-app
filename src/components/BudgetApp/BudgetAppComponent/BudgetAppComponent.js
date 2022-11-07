import { useState, useEffect } from 'react';
import InputComponent from '../../UI/Input/InputComponent';
import Button from '../../UI/Button/Button';
import BudgetAppSection from '../BudgetAppSection/BudgetAppSection';

import classes from './BudgetAppComponent.module.scss';
import buttonStyles from './../../UI/Button/Button.module.scss';
import BudgetAppTable from '../BudgetAppTable/BudgetAppTable';

const BudgetAppComponent = (props) => {
    const [summary, changeSummary] = useState(undefined)
    const [name, changeState] = useState('');
    const [value, changeValue] = useState('');

    const addHandlerSalaryName = (e) => {
        let salary = e.target.value;

        changeState(salary);
    }
    const addHandlerSalaryValue = (e) => {
        let salaryValue = e.target.value;

        changeValue(salaryValue);
    }

    const clearInputNameValue = () => {
        changeState('');
        changeValue('')
    }

    const addNameAndSalary = () => {
        let tab = { name: name, value: value }

        if (name === '' || value === '') {
            return null
        }
        if (summary === undefined) {
            changeSummary([tab])
        }

        else {
            changeSummary([...summary, tab])
        }
    }

    const totalSalaryValue = (item) => {
        let total = 0;

        if (summary !== undefined) {
            item.forEach((el, index) => { total = total + parseFloat(el.value) });
        } else if (summary === undefined) {
            return 0
        }

        return total;
    }

    const total = totalSalaryValue(summary);

    return (
        <section className={classes.budgetapp}>
            <div className={classes.bapp_wrapper}>
                <BudgetAppSection title="Add Salary">
                    <InputComponent name='Name' type='text' action={addHandlerSalaryName} value={name} />
                    <InputComponent name='Salary' type='number' action={addHandlerSalaryValue} value={value} />
                    <div className={classes.bapp_btn}>
                        <Button name='Add' click={addNameAndSalary} />
                        <Button name='Delete' color={buttonStyles.btn_red} click={clearInputNameValue} />
                    </div>
                </BudgetAppSection>
                <BudgetAppSection title="Total Founds"  >
                    <BudgetAppTable summary={summary} totalSumary={total}></BudgetAppTable>
                </BudgetAppSection>
            </div>
        </section>
    )
}

export default BudgetAppComponent;