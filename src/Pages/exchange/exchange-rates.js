import Wrapper from "../../components/UI/Wrapper/Wrapper";
import classes from './exchange-rates.module.scss';

const ExchangeRates = (props) => {
    return (
        <Wrapper>
            <h1>Exchange Rates</h1>
            <div className={classes.exchange_wrapper}>
                <p>Content</p>
            </div>
        </Wrapper>
    )
}

export default ExchangeRates