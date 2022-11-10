const initialState = {
    name: '',
    value: '',
}

const initialStateSummaryExpenses = {
    nameSalary: '',
    valuesalary: '',
}
function reducer(state, action) {
    switch (action.type) {
        case 'addName': return { ...state, name: action.name };
        case 'addValue': return { ...state, value: action.value };

        default: throw new Error()
    }
}

function reducerSummary(state, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case 'addSummary': return {
            ...state,
            nameSalary: action.name,
            valueSalary: action.value
        }
        case 'addExspansesName': return { ...state, nameSalary: action.addExspansesName };
        case 'addExspansesValue': return { ...state, salaryValue: action.addSalaryValue };
    }
}


// eslint-disable-next-line import/no-anonymous-default-export
export default { reducer, initialState, reducerSummary, initialStateSummaryExpenses };
