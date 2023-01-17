import { Fragment } from "react";

import classes from './Wrapper.module.scss'

const Wrapper = (props) => {
    const { css } = props
    return (<div className={`${classes.wrapper} ${classes[css]}`}>{props.children}</div>)

}

export default Wrapper;