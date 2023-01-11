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
    const [local, setLocal] = useState(true)
    const [stateUploadLocal, setStateUploadLocal] = useState([]);
    const [exchange, setExchange] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currency, setCurrency] = useState([])

    const data = JSON.parse(localStorage.getItem('exspenses'));

    useEffect(() => {
        setStateUploadLocal(stateExpenses)
    }, [stateExpenses])


    const url = 'http://api.nbp.pl/api/exchangerates/tables/A';
    const header = new Headers({ "Access-Control-Allow-Origin": "*" });
    async function fetchExchangeValue() {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch(url, {
                header: header
            })
            if (!response.ok) {
                throw new Error('Somthing went wrong')
            }
            const data = await response.json();
            const transformesExchange = data[0].rates.map(el => {
                console.log(el)
                return {
                    name: el.currency,
                    code: el.code,
                    value: el.mid
                }
            })
            console.log(data);
            setExchange(transformesExchange);
        } catch (error) {
            setError(error.message)
            console.log(error.message)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        fetchExchangeValue()
    }, [])

    console.log(exchange)

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

    const getLocalStorage = () => {

        if (data !== null) {

            dispatchExpenses({
                type: 'expensesSummary',
                ex: data.map((el) => {
                    return el
                })
            })
            setLocal(false)
        }
    }

    const setLocalStorageExspenses = () => {

        // eslint-disable-next-line react-hooks/rules-of-hooks
        localStorage.setItem("exspenses", JSON.stringify(stateExpenses));

    }

    const addExpenses = () => {

        if (stateSummary.nameSalary === '' || stateSummary.salaryValue === '') {
            return null
        } else {
            dispatchExpenses({
                type: 'expensesSummary',
                ex: { name: stateSummary.nameSalary, value: stateSummary.salaryValue }
            })
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
    const totalExspenses = totalSalaryValue(stateExpenses)

    const showOption = () => exchange.map((el, index) =>
        <option
            value={el.value}
            key={index}
            data-names={el.name}
            data-code={el.code}
        >
            {el.code}
        </option>
    )
    const addExchangeHandler = (e) => {
        const index = e.target.selectedIndex;
        const option = e.target.childNodes[index];


        setCurrency({
            name: option.getAttribute('data-names'),
            value: e.target.value,
            code: option.getAttribute('data-code')
        })
        console.log(currency)
    }
    return (
        <section className={classes.budgetapp}>
            <div className={classes.bapp_wrapper}>
                <BudgetAppSection title="Exchange rates" css="ba_section-full">

                    <div>
                        <select name="" id="" className={classes.select} options={currency} onChange={addExchangeHandler} defaultValue={{ code: "Choose one", value: "" }}>
                            <option value='' data-names=''
                                data-code=''>Choice</option>
                            {showOption()}
                        </select>
                    </div>
                    <div>
                        {currency.value !== '' && (<div><p>1 {currency.code} {`(${currency.name})`} to w przeliczeniu  </p>
                            <p><span className={classes.currency}>{currency.value}</span> PLN  </p></div>)}

                    </div>
                </BudgetAppSection>
                <BudgetAppSection title="Add Salary" >
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
                </BudgetAppSection>
                <BudgetAppSection title="Total Founds">
                    <BudgetAppTable summary={summary} totalSumary={total} restSalary={total - totalExspenses}></BudgetAppTable>
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
                    <BudgetAppTable summary={stateUploadLocal} totalSumary={totalExspenses}></BudgetAppTable>
                    {stateExpenses.length ? <Button name='Save' click={setLocalStorageExspenses} color={buttonStyles.btn_footer} /> : null}
                </BudgetAppSection>
            </div>
        </section>
    )
}

export default BudgetAppComponent;