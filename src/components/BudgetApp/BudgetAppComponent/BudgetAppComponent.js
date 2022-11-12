import { useState, useReducer, useEffect } from 'react';
import InputComponent from '../../UI/Input/InputComponent';
import Button from '../../UI/Button/Button';
import BudgetAppSection from '../BudgetAppSection/BudgetAppSection';

import classes from './BudgetAppComponent.module.scss';
import buttonStyles from './../../UI/Button/Button.module.scss';
import BudgetAppTable from '../BudgetAppTable/BudgetAppTable';

import Reducer from './../../../store/store';

const { reducer, initialState, reducerSummary, initialStateSummaryExpenses, reducerSummaryNameValueExpenses } = Reducer;

const BudgetAppComponent = (props) => {
    const [summary, changeSummary] = useState([])
    const [state, dispatch] = useReducer(reducer, initialState)
    const [stateSummary, dispatchSummary] = useReducer(reducerSummary, initialStateSummaryExpenses)
    const [stateExpenses, dispatchExpenses] = useReducer(reducerSummaryNameValueExpenses, [])

    const addHandlerInput = (e) => {
        if (e.target.name === 'NameSalary') {

            dispatch({
                type: 'addName',
                name: e.target.value
            })

        }
        if (e.target.name === 'Salary') {
            dispatch({
                type: 'addValue',
                value: e.target.value
            })
        }
        if (e.target.name === 'NameExpenses') {

            dispatchSummary({
                type: 'addExspansesName',
                nameSalary: e.target.value
            })
        }
        if (e.target.name === 'ValueExpenses') {

            dispatchSummary({
                type: 'addExspansesValue',
                salaryValue: e.target.value
            })
        }
    }

    const clearInputNameValue = () => {
        dispatch({
            type: 'addName',
            name: '',
        });
        dispatch({
            type: 'addValue',
            value: ''
        })
    }

    const clearInputExspenses = () => {
        dispatchSummary({
            type: 'addExspansesName',
            nameSalary: '',
        });
        dispatchSummary({
            type: 'addExspansesValue',
            salaryValue: ''
        })
    }

    const addNameAndSalary = () => {
        let tab = { name: state.name, value: state.value };

        if (state.name === '' || state.value === '') {
            return null
        }

        else {
            changeSummary([...summary, tab])
        }
    }

    const setLocalStorageExspenses = () => {

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            if (stateExpenses.length) {
                localStorage.setItem('exspenses', JSON.stringify(stateExpenses));
            }
        }, [stateExpenses])

    }

    setLocalStorageExspenses()

    const addExpenses = () => {

        if (stateSummary.nameSalary === '' || stateSummary.salaryValue === '') {
            return null
        } else {
            console.log('addExspenses');
            console.log()

            dispatchExpenses({
                type: 'expensesSummary',
                ex: { name: stateSummary.nameSalary, value: stateSummary.salaryValue }
            })

        }

    }

    console.log(reducer.state)

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
    const totalExspenses = totalSalaryValue(stateExpenses)

    return (
        <section className={classes.budgetapp}>
            <div className={classes.bapp_wrapper}>
                <BudgetAppSection title="Add Salary">
                    <InputComponent
                        name='NameSalary'
                        type='text'
                        placeholder='Add name'
                        action={addHandlerInput}
                        value={state.name}
                    />
                    <InputComponent
                        name='Salary'
                        type='number'
                        placeholder='Add value'
                        action={addHandlerInput}
                        value={state.value}
                    />
                    <div className={classes.bapp_btn}>
                        <Button name='Add' click={addNameAndSalary} />
                        <Button name='Clear' color={buttonStyles.btn_red} click={clearInputNameValue} />
                    </div>
                    <hr className={classes.separator} />
                </BudgetAppSection>
                <BudgetAppSection title="Total Founds"  >
                    <BudgetAppTable summary={summary} totalSumary={total}></BudgetAppTable>
                </BudgetAppSection>
                <BudgetAppSection title="Add Exspenses">
                    <InputComponent
                        name='NameExpenses'
                        type='text'
                        placeholder='Add name'
                        action={addHandlerInput}
                        value={stateSummary.nameSalary}
                    />
                    <InputComponent
                        name='ValueExpenses'
                        type='number'
                        placeholder='Add value'
                        action={addHandlerInput}
                        value={stateSummary.salaryValue}
                    />
                    <div className={classes.bapp_btn}>
                        <Button name='Add' click={addExpenses} />
                        <Button name='Clear' color={buttonStyles.btn_red} click={clearInputExspenses} />
                    </div>
                </BudgetAppSection>
                <BudgetAppSection title="Total Exspenses"  >
                    <BudgetAppTable summary={stateExpenses} totalSumary={totalExspenses}></BudgetAppTable>
                </BudgetAppSection>
                {total - totalExspenses}
            </div>
        </section>
    )
}

export default BudgetAppComponent;