const initialState = {
    name: '',
    value: '',
}

const initialStateSummaryExpenses = {
    nameSalary: '',
    salaryValue: '',
}
function reducer(state, action) {
    switch (action.type) {
        case 'addName': return { ...state, name: action.name };
        case 'addValue': return { ...state, value: action.value };
        default: throw new Error()
    }
}

function reducerSummary(stateSummary, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case 'addExspansesName': return { ...stateSummary, nameSalary: action.nameSalary };
        case 'addExspansesValue': return { ...stateSummary, salaryValue: action.salaryValue };
        default: throw new Error()
    }
}

function reducerSummaryNameValueExpenses(stateExpenses, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case 'expensesSummary': return [...stateExpenses, action.ex]

    }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default { reducer, initialState, reducerSummary, initialStateSummaryExpenses, reducerSummaryNameValueExpenses };
