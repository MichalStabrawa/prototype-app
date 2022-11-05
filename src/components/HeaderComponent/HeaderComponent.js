import classes from './HeaderComponent.module.scss';


const HeaderComponent = props => {
    return (<header className={classes.header}>
        <h1>Header lorem ipsum</h1>
        <p>Lorem ipsum description</p>
    </header>)
}

export default HeaderComponent