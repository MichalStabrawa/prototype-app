import Wrapper from "../../components/UI/Wrapper/Wrapper";
import classes from './exchange-rates.module.scss';
import { useSelector, useDispatch } from "react-redux";

const ExchangeRates = (props) => {
    const data = useSelector(state=>state.content.contents)
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