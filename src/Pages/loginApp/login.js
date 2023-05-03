import { useState } from "react";
import classes from './login.module.scss';
import Wrapper from '../../components/UI/Wrapper/Wrapper';
import InputComponent from '../../components/UI/Input/InputComponent';


const LoginApp = (props) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const addLogin = (e) => {
        const loginValue = e.target.value;
        console.log(loginValue)
        setLogin(loginValue)
    }

    const addpassword = (e) => {
        const passwordValue = e.target.value;
        console.log(passwordValue)
        setPassword(passwordValue)
    }
    return (
        <div className={classes.login}>
            <Wrapper>
                <div className={classes.login__wrapper}>
                    <h1>Login</h1>
                    <form action="">
                        <InputComponent placeholder='Login' name='Login' type='email' value={login} action={addLogin} />
                        <InputComponent placeholder='Password' name='Password' type='password' value={password} action={addpassword} />
                        <input type="submit" />
                    </form>
                </div>

            </Wrapper>
        </div>
    )
}

export default LoginApp

