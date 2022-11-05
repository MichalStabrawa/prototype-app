import { useState } from 'react';
import InputComponent from '../UI/Input/InputComponent';

import classes from './AddSection.module.scss';

const AddSection = (props) => {
    return (
        <section className={classes.addsection}>
            <h2>Add Salary</h2>
            <InputComponent name='Name' type='text' />
            <InputComponent name='Salary' type='number' />y
        </section>
    )
}

export default AddSection;