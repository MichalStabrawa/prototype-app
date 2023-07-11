const initialState = {
    name: '',
    value: '',
}

const initialStateSummaryExpenses = {
    nameSalary: '',
    salaryValue: '',
}
const initialDate = {
    currentDate: '',
    lastDate: '',
}

const initialLogin = {
    login: '',
    password: ''
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

function reducerSummarySalary(stateSalarySummary, action) {
    switch (action.type) {
        case 'salarySummary': return [...stateSalarySummary, action.ex];
        default: throw new Error()
    }
}

function reducerSummaryNameValueExpenses(stateExpenses, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case 'expensesSummary': return [...stateExpenses, action.ex];
        default: throw new Error()
    }
}

function reducerDate(stateDate, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case 'addCurentDate': return { ...stateDate, currentDate: action.currentDate };
        case 'addLastDate': return { ...stateDate, lastDate: action.lastDate };
        default: throw new Error()
    }
}

function addLoginPassword(stateLogin, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case 'addLogin': return { ...stateLogin, login: action.login };
        case 'addPassword': return { ...stateLogin, password: action.password }
    }

}

// eslint-disable-next-line import/no-anonymous-default-export
export default { reducer, initialState, reducerSummary, initialStateSummaryExpenses, reducerSummaryNameValueExpenses, reducerDate, initialDate, reducerSummarySalary, addLoginPassword, initialLogin };
