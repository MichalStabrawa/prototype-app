import classes from './BudgetAppSection.module.scss'

const BudgetAppSection = props => {
    return (
        <div className={classes.ba_section}>
            <h1>{props.title}</h1>
            <div className={classes.ba_section_content}>
                {props.children}
            </div>
        </div>
    )
}

export default BudgetAppSection