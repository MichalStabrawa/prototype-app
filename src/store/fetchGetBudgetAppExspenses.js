const urlExpenses = 'https://budget-app-1a588-default-rtdb.firebaseio.com/expenses.json';
const header = new Headers({ "Access-Control-Allow-Origin": "*" });

const fetchGetBudgetAppExspenses = async function (expenses) {
    try {
        const response = await fetch(urlExpenses, {
            header: header
        })
        if (!response.ok) {
            throw new Error('Somthing went wrong get expenses')
        }
        const data = await response.json()
        console.log('Data expenses')
    } catch (error) {
        console.log(error.message)
    }
}

export default fetchGetBudgetAppExspenses