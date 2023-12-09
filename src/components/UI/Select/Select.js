import classes from "./Select.module.scss";

const Select = (props) => {
  const { exchange, name, catchValue } = props;
  const showOption = () =>
    exchange.map((el, index) => (
      <option
        value={el.mid}
        key={index}
        data-names={el.currency}
        data-code={el.code}
      >
        {`${el.code} / ${el.currency}`}
      </option>
    ));
  return (
    <select name={name} className={classes.select} onChange={catchValue}>
      <option value="" data-names="" data-code="">
        Choice
      </option>
      {exchange && showOption()}
    </select>
  );
};

export default Select;
