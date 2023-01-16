import classes from './Select.module.scss'

const Select = (props) => {
    const { exchange, name, catchValue } = props;
    console.log('Select')
    console.log(exchange)
    console.log(catchValue)
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
        < select name={name} className={classes.select} onChange={catchValue}>
            <option
                value=''
                data-names=''
                data-code=''>Choice
            </option>
            {showOption()}
        </select >
    )

}

export default Select;