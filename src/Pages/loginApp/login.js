import { useState } from "react";
import classes from './login.module.scss';
import Wrapper from '../../components/UI/Wrapper/Wrapper';
import InputComponent from '../../components/UI/Input/InputComponent';
import Button from "../../components/UI/Button/Button";
import buttonStyles from '../../components/UI/Button/Button.module.scss';
import { Link } from 'react-router-dom'


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
                        <div className={classes.login__wrapper__link}>
                            <Link to='/login/remind-login'>
                                I don't remember the username</Link>
                        </div>

                        <InputComponent placeholder='Password' name='Password' type='password' value={password} action={addpassword} />
                        <div className={classes.login__wrapper__link}>
                            <Link to='/login/remind-login'>
                                I don't remember the password</Link>
                        </div>
                        <Button name={'Submit'} color={buttonStyles.btn_transparent} />
                    </form>
                    <div className="login__register">
                        <h2>Do you have not login?</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor </p>
                        <Link to='/register'>
                            <Button name={'Register'}></Button>
                        </Link>
                    </div>
                </div>


            </Wrapper>
        </div>
    )
}

export default LoginApp

