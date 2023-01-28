import { useState, useReducer, useEffect } from 'react';
import InputComponent from '../../UI/Input/InputComponent';
import Button from '../../UI/Button/Button';
import BudgetAppSection from '../BudgetAppSection/BudgetAppSection';
import Select from '../../UI/Select/Select';
import IconArrow from '../../UI/iconArrow/iconArrow';

import classes from './BudgetAppComponent.module.scss';
import buttonStyles from './../../UI/Button/Button.module.scss';
import BudgetAppTable from '../BudgetAppTable/BudgetAppTable';
import getCurrentDate from '../../../utils/dateFunction';
import fetchNBP from '../../../store/fetchNbpApi';
import fetchCurrentNBP from '../../../store/fetchNbpCurrentApi';
import getCurrentPrevDifferences from '../../../utils/getCurrentPrevDifferences';

import Reducer from './../../../store/store';
import Wrapper from '../../UI/Wrapper/Wrapper';

const { reducer, initialState, reducerSummary, initialStateSummaryExpenses, reducerSummaryNameValueExpenses, reducerDate, initialDate } = Reducer;

const BudgetAppComponent = (props) => {
    const [summary, changeSummary] = useState([])
    const [state, dispatch] = useReducer(reducer, initialState)
    const [stateSummary, dispatchSummary] = useReducer(reducerSummary, initialStateSummaryExpenses)
    const [stateExpenses, dispatchExpenses] = useReducer(reducerSummaryNameValueExpenses, [])
    const [stateDate, dispatchDate] = useReducer(reducerDate, initialDate)
    const [local, setLocal] = useState(true)
    const [stateUploadLocal, setStateUploadLocal] = useState([]);
    const [exchange, setExchange] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currency, setCurrency] = useState([])
    const [exchangeValue, setExchangeValue] = useState('1');
    const [isLoadingLast, setIsLoadingLast] = useState(false);
    const [exchangeLast, setExchangeLast] = useState([]);
    const [errorLast, setErrorLast] = useState(null);

    useEffect(() => {
        setStateUploadLocal(stateExpenses)
    }, [stateExpenses])

    useEffect(() => {
        fetchCurrentNBP(setIsLoading, setError, setExchange, dispatchDate)
    }, [])

    useEffect(() => {
        fetchNBP(setIsLoadingLast, setErrorLast, setExchangeLast, dispatchDate)
    }, [])

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
        if (e.target.name === 'Count') {
            setExchangeValue(e.target.value);
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

    const addExchangeHandler = (e) => {
        const index = e.target.selectedIndex;
        const option = e.target.childNodes[index];

        setCurrency({
            name: option.getAttribute('data-names'),
            value: e.target.value,
            code: option.getAttribute('data-code')
        })
    }

    return (
        <section className={classes.budgetapp}>
            <div className={classes.bapp_wrapper}>
                <BudgetAppSection title="Exchange rates" css="ba_section-full">
                    <Wrapper css="wrapper-content">
                        <div className={classes.exchange_item}>
                            <div>
                                <span>Current NBP {stateDate.currentDate} {getCurrentDate()}</span>
                                <Select name='Count' catchValue={addExchangeHandler} exchange={exchange}>
                                </Select>
                            </div>
                            <div>
                                {(currency.value !== '' && currency.value !== undefined) && (<div>
                                    <div>
                                        <InputComponent name='Count' type='number' value={exchangeValue}
                                            action={addHandlerInput} />{currency.code} {`(${currency.name})`} to w przeliczeniu
                                    </div>
                                    <p><span className={classes.currency}>{(+exchangeValue * currency.value).toFixed(2)} </span>
                                        PLN </p>
                                </div>)}
                            </div>
                        </div>
                        <div className={classes.exchange_item}>
                            <p className={classes.exchange_item__paragraph}>
                                <span className={classes.last_wrapper}> <span className={classes.text_bold}>{exchange[1]?.code}</span>
                                    {exchange[1]?.value}</span>
                                <span
                                    className={`${classes.last_value} ${classes[getCurrentPrevDifferences(exchange[1]?.value,
                                        exchangeLast[1]?.value)]}`}>
                                    {(exchange[1]?.value - exchangeLast[1]?.value).toFixed(3)}
                                </span>
                                <IconArrow arrow={getCurrentPrevDifferences(exchange[1]?.value,
                                    exchangeLast[1]?.value)}
                                />
                                <span>{exchangeLast[1]?.value}</span>
                            </p>
                            <p className={classes.exchange_item__paragraph}>
                                <span className={classes.last_wrapper}> <span className={classes.text_bold}>{exchange[7]?.code}</span>
                                    {exchange[7]?.value}</span>
                                <span
                                    className={`${classes.last_value} ${classes[getCurrentPrevDifferences(exchange[7]?.value,
                                        exchangeLast[7]?.value)]}`}>
                                    {(exchange[7]?.value - exchangeLast[7]?.value).toFixed(3)}
                                </span>
                                <IconArrow arrow={getCurrentPrevDifferences(exchange[7]?.value,
                                    exchangeLast[7]?.value)}
                                />
                                <span>{exchangeLast[7]?.value}</span>
                            </p>
                            <p className={classes.exchange_item__paragraph}>
                                <span className={classes.last_wrapper}><span
                                    className={classes.text_bold}>
                                    {exchange[9]?.code}
                                </span> {exchange[9]?.value}</span>
                                <span
                                    className={`${classes.last_value} ${classes[getCurrentPrevDifferences(exchange[9]?.value, exchangeLast[9]?.value)]}`}>
                                    {(exchange[9]?.value - exchangeLast[9]?.value).toFixed(3)}
                                </span>
                                <IconArrow arrow={getCurrentPrevDifferences(exchange[9]?.value,
                                    exchangeLast[9]?.value)}
                                />
                                <span>{exchangeLast[9]?.value}</span>
                            </p>
                            <p className={classes.exchange_item__paragraph}>
                                <span className={classes.last_wrapper}>
                                    <span className={classes.text_bold}>{exchange[10]?.code} </span>
                                    {exchange[10]?.value}
                                </span>
                                <span
                                    className={`${classes.last_value} ${classes[getCurrentPrevDifferences(exchange[10]?.value,
                                        exchangeLast[10]?.value)]}`}>{(exchange[10]?.value -
                                            exchangeLast[10]?.value).toFixed(3)}
                                </span>
                                <IconArrow arrow={getCurrentPrevDifferences(exchange[10]?.value,
                                    exchangeLast[10]?.value)}
                                />
                                <span>{exchangeLast[10]?.value}</span>
                            </p>
                        </div>
                    </Wrapper>
                </BudgetAppSection>
                <BudgetAppSection title="Add Salary">
                    <InputComponent name='NameSalary' type='text' placeholder='Add name' action={addHandlerInput}
                        value={state.name} />
                    <InputComponent name='Salary' type='number' placeholder='Add value' action={addHandlerInput}
                        value={state.value} />
                    <div className={classes.bapp_btn}>
                        <Button name='Add' click={addNameAndSalary} />
                        <Button name='Clear' color={buttonStyles.btn_red} click={clearInputNameValue} />
                    </div>
                </BudgetAppSection>
                <BudgetAppSection title="Total Founds">
                    <BudgetAppTable summary={summary} totalSumary={total} restSalary={total - totalExspenses}></BudgetAppTable>
                </BudgetAppSection>
                <BudgetAppSection title="Add Exspenses">
                    <InputComponent name='NameExpenses' type='text' placeholder='Add name' action={addHandlerInput}
                        value={stateSummary.nameSalary} />
                    <InputComponent name='ValueExpenses' type='number' placeholder='Add value' action={addHandlerInput}
                        value={stateSummary.salaryValue} />
                    <div className={classes.bapp_btn}>
                        <Button name='Add' click={addExpenses} />
                        <Button name='Clear' color={buttonStyles.btn_red} click={clearInputExspenses} />
                    </div>
                </BudgetAppSection>
                <BudgetAppSection title="Total Exspenses">
                    <BudgetAppTable summary={stateUploadLocal} totalSumary={totalExspenses}></BudgetAppTable>
                    {stateExpenses.length ? <Button name='Save' click={setLocalStorageExspenses}
                        color={buttonStyles.btn_footer} /> : null}
                </BudgetAppSection>
            </div>
        </section>
    )
}

export default BudgetAppComponent;