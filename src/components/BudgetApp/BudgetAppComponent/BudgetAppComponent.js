import { useState } from 'react';
import InputComponent from '../../UI/Input/InputComponent';
import Button from '../../UI/Button/Button';
import BudgetAppSection from '../BudgetAppSection/BudgetAppSection';

import classes from './BudgetAppComponent.module.scss';
import buttonStyles from './../../UI/Button/Button.module.scss';

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
            <div className={classes.bapp_wrapper}>
                <BudgetAppSection title="Add Salary">
                    <InputComponent name='Name' type='text' action={addHandlerSalaryName} />
                    <InputComponent name='Salary' type='number' action={addHandlerSalaryValue} />
                    <div className={classes.bapp_btn}>
                        <Button name='Add' click={addNameAndSalary} />
                        <Button name='Delete' color={buttonStyles.btn_red} />
                    </div>

                </BudgetAppSection>
                <BudgetAppSection title="Total Founds">
                    <p>{state} {value}</p>
                </BudgetAppSection>


            </div>





        </section>
    )
}

export default BudgetAppComponent;