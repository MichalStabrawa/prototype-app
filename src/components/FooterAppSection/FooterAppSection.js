import { Link } from 'react-router-dom'
import classes from './FooterAppSection.module.scss';
import buttonStyles from '../UI/Button/Button.module.scss';
import Button from '../UI/Button/Button';

const FooterAppSection = () => {
    return (<footer className={classes.footer}>
        <div className={classes.footer_main}>
            <p>Lorem ipsum</p>
            <Link to='/register'>
                <Button name={'Register'}></Button>
            </Link>
        </div>
        <div className={classes.footer_bottom} color={buttonStyles.btn_transparent}>
            <p>&copy; copyright</p>
        </div>
    </footer>)
}

export default FooterAppSection