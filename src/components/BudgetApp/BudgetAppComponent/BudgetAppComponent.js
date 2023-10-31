import { useState, useReducer, useEffect } from 'react';
import InputComponent from '../../UI/Input/InputComponent';
import Button from '../../UI/Button/Button';
import BudgetAppSection from '../BudgetAppSection/BudgetAppSection';
import classes from './BudgetAppComponent.module.scss';
import buttonStyles from './../../UI/Button/Button.module.scss';
import BudgetAppTable from '../BudgetAppTable/BudgetAppTable';
import Reducer from './../../../store/store';
import BudgetAppExchange from '../BudgetAppExchangeComponent/BudgetAppExchange';
import fetchBudgetAppSalary from '../../../store/fetchBudgetAppSalary';
import getCurrentDate from '../../../utils/dateFunction';
import fetchGetBudgetApp from '../../../store/fetchGetBudgetApp'
import fetchBudgetAppExpenses from '../../../store/fetchBudgetAppExpenses';
import fetchGetBudgetAppExspenses from '../../../store/fetchGetBudgetAppExspenses';
import BudgetAppFilters from '../BudgetAppFiltersComponent/BudgetAppFIlters';

const { reducer, initialState, reducerSummary, initialStateSummaryExpenses, reducerSummaryNameValueExpenses, reducerSummarySalary } = Reducer;

const BudgetAppComponent = (props) => {
    const [summary, changeSummary] = useState([])
    const [state, dispatch] = useReducer(reducer, initialState)
    const [stateSummary, dispatchSummary] = useReducer(reducerSummary, initialStateSummaryExpenses)
    const [stateSalarySummary, dispatchSalarySummary] = useReducer(reducerSummarySalary, [])
    const [stateExpenses, dispatchExpenses] = useReducer(reducerSummaryNameValueExpenses, [])
    const [stateUploadLocal, setStateUploadLocal] = useState([]);
    const [exchangeValue, setExchangeValue] = useState('1');
    const [isLoadingGet, setIsLoadingGet] = useState(false)
    const [error, setIsGetError] = useState(null)
    const [emptyInputSalary, setEmptyInputSalary] = useState(true);
    const [emptyExpensesInput, setEmptyExpensesInput] = useState(true);
    const [filter, setFilter] = useState(false);
    const [filterSalaryValue,setFilterSalaryValue] = useState(null)

    console.log('StateSalary')
    console.log(summary)

    const currentDate = getCurrentDate();
    useEffect(() => {
        changeSummary(stateSalarySummary)
    }, [stateSalarySummary])

    useEffect(() => {
        setStateUploadLocal(stateExpenses)
    }, [stateExpenses])

    useEffect(() => {
        fetchGetBudgetApp(setIsLoadingGet, setIsGetError, changeSummary)
    }, [])

    useEffect(() => {
        fetchGetBudgetAppExspenses(setStateUploadLocal)
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

        if (state.name === '' || state.value === '') {
            setEmptyInputSalary(false)
            return null
        }

        else {
            setEmptyInputSalary(true)
            dispatchSalarySummary({
                type: 'salarySummary',
                ex: { name: state.name, value: state.value, date: currentDate }
            })
            dispatch({
                type: 'addName',
                name: '',
            });
            dispatch({
                type: 'addValue',
                value: ''
            })
        }
    }

    const setLocalStorageExspenses = () => {

        // eslint-disable-next-line react-hooks/rules-of-hooks
        localStorage.setItem("exspenses", JSON.stringify(stateExpenses));
    }

    const addExpenses = () => {

        if (stateSummary.nameSalary === '' || stateSummary.salaryValue === '') {
            setEmptyExpensesInput(false)
            return null
        } else {
            setEmptyExpensesInput(true);
            dispatchExpenses({
                type: 'expensesSummary',
                ex: { name: stateSummary.nameSalary, value: stateSummary.salaryValue, date: currentDate }
            })
            dispatchSummary({
                type: 'addExspansesName',
                nameSalary: '',
            });
            dispatchSummary({
                type: 'addExspansesValue',
                salaryValue: ''
            })
        }
    }

    const totalSalaryValue = (item) => {
        let total = 0;

        if (summary !== undefined) {
            item.forEach((el) => { total = total + parseFloat(el.value) });
        } else if (summary === undefined) {
            return 0
        }

        return total;
    }

    const total = totalSalaryValue(summary);
    const totalExspenses = totalSalaryValue(stateUploadLocal)

    const addSaveSalaryHandler = () => {
        fetchBudgetAppSalary(summary)
    }

    const addSaveExpensesHandler = () => {
        fetchBudgetAppExpenses(stateExpenses)
    }

    //show &hide filter section
    const showAndHideFilter = () => {
        setFilter(!filter)

    }

    const addHandlerFilterSalary =(e)=> {
        const index = e.target.selectedIndex;
        const option = e.target.childNodes[index];
        setFilterSalaryValue(e.target.value)
    }

    return (
        <section className={classes.budgetapp}>
            <div className={classes.bapp_wrapper}>
                <BudgetAppSection title="Exchange rates" css="ba_section-full">
                    <BudgetAppExchange css="wrapper-content" exchangeValue={exchangeValue} addHandlerInput={addHandlerInput} />
                </BudgetAppSection>
                <BudgetAppSection title="Add Salary" css="ba_section_full_mobile">
                    <InputComponent name='NameSalary' type='text' placeholder='Add name' action={addHandlerInput}
                        value={state.name} />
                    <InputComponent name='Salary' type='number' placeholder='Add value' action={addHandlerInput}
                        value={state.value} />
                    {!emptyInputSalary && <p className={classes.invalid}>One input is empty!!!</p>}
                    <div className={classes.bapp_btn}>
                        <Button name='Add' click={addNameAndSalary} />
                        <Button name='Clear' color={buttonStyles.btn_red} click={clearInputNameValue} />
                    </div>
                </BudgetAppSection>
                <BudgetAppSection title="Total Founds" css="ba_section_full_mobile">
                    {stateSalarySummary.length !== 0 && <Button name='Save' click={addSaveSalaryHandler} />}
                    {summary.length > 0 && <Button name='Filter' color={buttonStyles.btn_transparent} click={showAndHideFilter}></Button>}
                    <div className={classes.filter}>  {filter && <BudgetAppFilters salaryOnChange={addHandlerFilterSalary} data={summary}></BudgetAppFilters>}</div>

                    {isLoadingGet && <p>IS LOADING</p>}
                    <BudgetAppTable summary={summary} totalSumary={total} restSalary={total - totalExspenses}></BudgetAppTable>
                </BudgetAppSection>
                <BudgetAppSection title="Add Exspenses" css="ba_section_full_mobile">
                    <InputComponent name='NameExpenses' type='text' placeholder='Add name' action={addHandlerInput}
                        value={stateSummary.nameSalary} />
                    <InputComponent name='ValueExpenses' type='number' placeholder='Add value' action={addHandlerInput}
                        value={stateSummary.salaryValue} />
                    {!emptyExpensesInput && <p className={classes.invalid}>One input is empty!!!</p>}
                    <div className={classes.bapp_btn}>
                        <Button name='Add' click={addExpenses} />
                        <Button name='Clear' color={buttonStyles.btn_red} click={clearInputExspenses} />
                    </div>
                </BudgetAppSection>
                <BudgetAppSection title="Total Exspenses" css="ba_section_full_mobile">
                    {stateExpenses.length !== 0 && <Button name='Save' click={addSaveExpensesHandler} />}
                    <BudgetAppTable summary={stateUploadLocal} totalSumary={totalExspenses}></BudgetAppTable>
                    {stateExpenses.length ? <Button name='Save' click={setLocalStorageExspenses}
                        color={buttonStyles.btn_footer} /> : null}
                </BudgetAppSection>
            </div>
        </section>
    )
}

export default BudgetAppComponent;