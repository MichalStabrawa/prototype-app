import { Fragment } from "react";

import classes from './Wrapper.module.scss'

const Wrapper = (props) => {
    return (<div className={classes.wrapper}>{props.children}</div>)
}

export default Wrapper;