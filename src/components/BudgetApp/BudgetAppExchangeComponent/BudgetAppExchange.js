import { React, useState, useEffect, useReducer } from 'react';
import Wrapper from "../../UI/Wrapper/Wrapper";
import classes from '../../BudgetApp/BudgetAppExchangeComponent/BudgetAppExchange.module.scss';
import Select from '../../UI/Select/Select';
import InputComponent from '../../UI/Input/InputComponent';
import IconArrow from '../../UI/iconArrow/iconArrow';
import getCurrentDate from '../../../utils/dateFunction';
import fetchNBP from '../../../store/fetchNbpApi';
import fetchCurrentNBP from '../../../store/fetchNbpCurrentApi';
import getCurrentPrevDifferences from '../../../utils/getCurrentPrevDifferences';

import Reducer from './../../../store/store';

const { reducerDate, initialDate } = Reducer;

const BudgetAppExchange = (props) => {
    const [stateDate, dispatchDate] = useReducer(reducerDate, initialDate);
    const [currency, setCurrency] = useState([])
    const [exchange, setExchange] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isLoadingLast, setIsLoadingLast] = useState(false);
    const [exchangeLast, setExchangeLast] = useState([]);
    const [errorLast, setErrorLast] = useState(null);

    useEffect(() => {
        fetchCurrentNBP(setIsLoading, setError, setExchange, dispatchDate)
    }, [])

    useEffect(() => {
        fetchNBP(setIsLoadingLast, setErrorLast, setExchangeLast, dispatchDate)
    }, [])

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
        <Wrapper css={props.css}>
            {isLoading && <p>Is Loading</p>}
            <div className={classes.exchange_item}>
                <div>
                    <span>Current NBP {stateDate.currentDate} {getCurrentDate()}</span>
                    <Select name='Count' catchValue={addExchangeHandler} exchange={exchange}>
                    </Select>
                </div>
                <div>
                    {(currency.value !== '' && currency.value !== undefined) && (<div>
                        <div>
                            <InputComponent name='Count' type='number' value={props.exchangeValue}
                                action={props.addHandlerInput} />{currency.code} {`(${currency.name})`} to w przeliczeniu
                        </div>
                        <p><span className={classes.currency}>{(+props.exchangeValue * currency.value).toFixed(2)} </span>
                            PLN </p>
                    </div>)}
                </div>
            </div>
            <div className={classes.exchange_item}>
                <p className={classes.exchange_item__paragraph}>
                    <span className={classes.last_wrapper}> <span className={classes.text_bold}>{exchange[1]?.code}</span>
                        {exchange[1]?.value}</span>
                    <span className={classes.last_date}>{stateDate.currentDate}</span>
                    <span
                        className={`${classes.last_value} ${classes[getCurrentPrevDifferences(exchange[1]?.value,
                            exchangeLast[1]?.value)]}`}>
                        {(exchange[1]?.value - exchangeLast[1]?.value).toFixed(3)}
                    </span>
                    <IconArrow arrow={getCurrentPrevDifferences(exchange[1]?.value,
                        exchangeLast[1]?.value)}
                    />
                    <span>{exchangeLast[1]?.value}</span>
                    <span className={classes.last_date}>{stateDate.lastDate}</span>
                </p>
                <p className={classes.exchange_item__paragraph}>
                    <span className={classes.last_wrapper}> <span className={classes.text_bold}>{exchange[7]?.code}</span>
                        {exchange[7]?.value}</span>
                    <span className={classes.last_date}>{stateDate.currentDate}</span>
                    <span
                        className={`${classes.last_value} ${classes[getCurrentPrevDifferences(exchange[7]?.value,
                            exchangeLast[7]?.value)]}`}>
                        {(exchange[7]?.value - exchangeLast[7]?.value).toFixed(3)}
                    </span>
                    <IconArrow arrow={getCurrentPrevDifferences(exchange[7]?.value,
                        exchangeLast[7]?.value)}
                    />
                    <span>{exchangeLast[7]?.value}</span>
                    <span className={classes.last_date}>{stateDate.lastDate}</span>
                </p>
                <p className={classes.exchange_item__paragraph}>
                    <span className={classes.last_wrapper}><span
                        className={classes.text_bold}>
                        {exchange[9]?.code}
                    </span> {exchange[9]?.value}</span>
                    <span className={classes.last_date}>{stateDate.currentDate}</span>
                    <span
                        className={`${classes.last_value} ${classes[getCurrentPrevDifferences(exchange[9]?.value, exchangeLast[9]?.value)]}`}>
                        {(exchange[9]?.value - exchangeLast[9]?.value).toFixed(3)}
                    </span>
                    <IconArrow arrow={getCurrentPrevDifferences(exchange[9]?.value,
                        exchangeLast[9]?.value)}
                    />
                    <span>{exchangeLast[9]?.value}</span>
                    <span className={classes.last_date}>{stateDate.lastDate}</span>
                </p>
                <p className={classes.exchange_item__paragraph}>
                    <span className={classes.last_wrapper}>
                        <span className={classes.text_bold}>{exchange[10]?.code} </span>
                        {exchange[10]?.value}

                    </span>
                    <span className={classes.last_date}>{stateDate.currentDate}</span>
                    <span
                        className={`${classes.last_value} ${classes[getCurrentPrevDifferences(exchange[10]?.value,
                            exchangeLast[10]?.value)]}`}>{(exchange[10]?.value -
                                exchangeLast[10]?.value).toFixed(3)}
                    </span>
                    <IconArrow arrow={getCurrentPrevDifferences(exchange[10]?.value,
                        exchangeLast[10]?.value)}
                    />
                    <span>{exchangeLast[10]?.value}</span>
                    <span className={classes.last_date}>{stateDate.lastDate}</span>
                </p>
            </div>
        </Wrapper>
    )
}

export default BudgetAppExchange