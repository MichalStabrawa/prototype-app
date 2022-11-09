import { react, useReducer } from "react";


const initialState = {
    name: '',
    value: ''
}
function reducer(state, action) {
    switch (action.type) {
        case 'addName': return { ...state, name: action.name };
        case 'addValue': return { ...state, value: action.value };

        default: throw new Error()
    }
}


// eslint-disable-next-line import/no-anonymous-default-export
export default { reducer, initialState };
