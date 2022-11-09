import classes from './BudgetAppTable.module.scss';

const BudgetAppTable = props => {

    const { summary } = props;

    return (
        <div>
            <p className={classes.total}>Total {props.totalSumary}</p>
            {summary !== undefined ? (<table className={classes.table}>
                <thead className={classes.dark}>
                    <tr>
                        <th >Name</th>
                        <th >Value</th>
                    </tr>
                </thead>
                <tbody>
                    {summary !== undefined && summary.map((item, index) => (
                        <tr key={index}>
                            <th>{item.name}</th><th>{item.value}</th>
                        </tr>)
                    )}
                </tbody>
            </table>) : null}

        </div>
    )
}

export default BudgetAppTable