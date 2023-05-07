import { useState } from 'react';
import InputComponent from '../../components/UI/Input/InputComponent';
import Wrapper from '../../components/UI/Wrapper/Wrapper';
import classes from './remindLogin.scss';
import loginStyles from '../loginApp/login.module.scss';
import Button from '../../components/UI/Button/Button';

const RemindLogin = (props) => {
    return (
        <div className={loginStyles.login}>
            <Wrapper>
                <div className={loginStyles.login__wrapper}>
                    <h1>Remind user
                        Your username will be sent to you on the setup email address upon registration</h1>
                    <InputComponent name='Remind login' />
                    <Button name='Submit' />
                </div>

            </Wrapper>

        </div>

    )
}
export default RemindLogin