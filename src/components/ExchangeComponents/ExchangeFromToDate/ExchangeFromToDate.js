import BudgetAppSection from "../../BudgetApp/BudgetAppSection/BudgetAppSection";
import Select from "../../UI/Select/Select";
import Button from "../../UI/Button/Button";
import InputComponent from "../../UI/Input/InputComponent";

import classes from "./ExchangeFromToDate.module.scss";

const ExchangeFromToDate = () => {
  return (
    <div className={classes.exchange_date}>
    <BudgetAppSection>
    
        <h3>Exchange from date to date</h3>
        <div className={classes.content}>
            <Select/>
            <InputComponent type="date"/>
            <InputComponent type="date"/>
            <Button name="Check"/>
        </div>
    
    </BudgetAppSection>  </div>
  );
};

export default ExchangeFromToDate;
