import classes from './Select.module.scss'

const Select = (props) => {
    const [exchange, name] = props;
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
    return (
        < select name={props.name} className={classes.select} >
            <option
                value=''
                data-names=''
                data-code=''>Choice
            </option>
            {showOption}
        </select >
    )

}

export default Select;