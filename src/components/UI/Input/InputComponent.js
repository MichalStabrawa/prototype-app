import { useState, useEffect } from 'react';
import classes from './InputComponent.module.scss';

const InputComponent = props => {
    const [value, setValue] = useState('');

    useEffect(() => {
        if (props.value !== '') {
            setValue(props.value)
        } else {
            setValue('')
        }
    }, [props.value])

    return (
        <div className={classes.input_wrapper}>
            <label htmlFor="" className={classes.input_wrapper_label}>{props.name}</label>
            <input className={classes.input_wrapper_item}
                type={props.type}
                name={props.name}
                onChange={props.action}
                value={value}
                placeholder={props.placeholder}
            />
        </div>
    )
}

export default InputComponent;