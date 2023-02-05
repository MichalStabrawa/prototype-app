const urlExpenses = 'https://budget-app-1a588-default-rtdb.firebaseio.com/expenses.json';
const header = new Headers({ "Access-Control-Allow-Origin": "*" });

const fetchBudgetAppExpenses = async function (expenses) {
    try {
        const response = await fetch(urlExpenses, {
            method: 'POST',
            body: JSON.stringify(expenses),
            header: header,
            headers: {
                'Content-Type': 'aplication/json'
            }

        })
        if (!response.ok) {
            throw new Error('Somthing went wrong')
        }
        const data = await response.json();
        console.log(data)
    } catch (error) {
        console.log(error.message)
    }
}

export default fetchBudgetAppExpenses