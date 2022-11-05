import classes from './InputComponent.module.scss';

const InputComponent = props => {
    return (
        <div className={classes.input_wrapper}>
            <label htmlFor="" className={classes.input_wrapper_label}>{props.name}</label>
            <input className={classes.input_wrapper_item} type={props.type} onChange={props.action} />
        </div>
    )
}

export default InputComponent;