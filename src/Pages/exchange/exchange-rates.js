import Wrapper from "../../components/UI/Wrapper/Wrapper";
import classes from './exchange-rates.module.scss';
import { useSelector} from "react-redux";

const ExchangeRates = (props) => {
    const currency = useSelector(state=> state.currency.data)
    return (
        <Wrapper>
            <h1>Exchange Rates</h1>
            <div className={classes.exchange_wrapper}>
                <p>Table {currency.table}</p>
                <p>DATA {currency.effectiveDate}</p>
            </div>
        </Wrapper>
    )
}

export default ExchangeRates