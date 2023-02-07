const urlExpenses = 'https://budget-app-1a588-default-rtdb.firebaseio.com/expenses.json';
const header = new Headers({ "Access-Control-Allow-Origin": "*" });

const fetchGetBudgetAppExspenses = async function (setStateUploadLocal) {
    try {
        const response = await fetch(urlExpenses, {
            header: header
        })
        if (!response.ok) {
            throw new Error('Somthing went wrong get expenses')
        }
        const data = await response.json()
        console.log('Data expenses')
        console.log(data)

        const loadExpenes = []

        for (const key in data) {
            for (const innerKey in data[key]) {
                loadExpenes.push({
                    name: data[key][innerKey].name,
                    value: data[key][innerKey].value,
                    date: data[key][innerKey].date
                })
            }
        }
        setStateUploadLocal(loadExpenes)
    } catch (error) {
        console.log(error.message)
    }
}

export default fetchGetBudgetAppExspenses