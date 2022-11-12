import classes from './BudgetAppTable.module.scss';

const BudgetAppTable = props => {

    const { summary } = props;

    return (
        <div>
            <div className={classes.table_wrapper}>
                <p className={classes.total}>Total {props.totalSumary}</p>
                {props.restSalary ? <span className={classes.rest_salary}>Rest: {props.restSalary}</span> : null}
            </div>

            {summary !== undefined && summary.length ? (<table className={classes.table}>
                <thead className={classes.dark}>
                    <tr>
                        <th>#</th>
                        <th >Name</th>
                        <th >Value</th>
                    </tr>
                </thead>
                <tbody>
                    {summary !== undefined && summary.map((item, index) => (
                        <tr key={index}>
                            <th>{index + 1}</th><th>{item.name}</th><th>{item.value}</th>
                        </tr>)
                    )}
                </tbody>
            </table>) : null}

        </div>
    )
}

export default BudgetAppTable