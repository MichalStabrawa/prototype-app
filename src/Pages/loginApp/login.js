import { useState } from "react";
import classes from './login.module.scss';
import Wrapper from '../../components/UI/Wrapper/Wrapper';
import InputComponent from '../../components/UI/Input/InputComponent';

const LoginApp = (props) => {
    const [login, changeLogin] = useState([])

    const addLogin = (e) => {
        const loginValue = e.target.value;
        changeLogin(loginValue)
    }
    return (
        <div className="login">
            <Wrapper>
                <h1>Login</h1>
                <form action="">
                    <InputComponent placeholder='login' name='login' type='email' value={login} onChange={addLogin} />
                    <input type="submit" />
                </form>
            </Wrapper>
        </div>
    )
}

export default LoginApp

