

import classes from './BudgetAppTable.module.scss';



const BudgetAppTable = props => {

    return (
        <div>
            <p className={classes.total}>Total {props.totalSumary}</p>
            <table className={classes.table}>
                <thead className={classes.dark}>
                    <tr>
                        <th >Name</th>
                        <th >Value</th>
                    </tr>
                </thead>
                <tbody>
                    {props.summary !== undefined && props.summary.map((item, index) => (<tr key={index + 1}><th>{item.name}</th><th>{item.value}</th></tr>))}
                </tbody>
            </table>
        </div>
    )
}

export default BudgetAppTable