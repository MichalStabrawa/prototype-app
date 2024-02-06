import classes from "./HowDoesItWork.module.scss";
import { BsCurrencyExchange } from "react-icons/bs";
import { AiOutlineGold } from "react-icons/ai";
import { FaChartBar } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";

import imgInfo from '../../assets/undraw_instant_information_re_c5v5.svg';

function HowDoesItWork({scrollToRef}) {
  return (
    <section className={classes.how_works} ref={scrollToRef}>
      <div className={classes.how_works_tile}>
        <h2>How does it works?</h2>
        <figure>
            <img src={imgInfo} alt="information" />
        </figure>
      </div>
      <div className={classes.how_works_tile}>
        <span className={classes.icon_wrapper}>
          <BsCurrencyExchange />
        </span>
        <h4>Exchange rates</h4>
        <p>
          Check exchange rates.Compare charts with exchange rates.Check previous
          exchange rates.
        </p>
      </div>
      <div className={classes.how_works_tile}>
        <span className={classes.icon_wrapper}>
          <AiOutlineGold />
        </span>
        <h4>Gold rates</h4>
        <p>
          Check current and previous gold prices. Compare previous quotes from
          different time periods.
        </p>
      </div>
      <div className={classes.how_works_tile}>
        <span className={classes.icon_wrapper}>
          <FaChartBar />
        </span>
        <h4>Budget control</h4>
        <p>
          Control your household budget. Add up your cash inflows and your
          expenses. Check payment deadlines for invoices and bills. Analyze your
          budget charts.
        </p>
      </div>
      <div className={classes.how_works_tile}>
        <span className={classes.icon_wrapper}>
          <FaInfoCircle />
        </span>
        <h4>Other information</h4>
        <p>
          Check out other information on how to use the BudgetApp application.
        </p>
      </div>
    </section>
  );
}

export default HowDoesItWork;
