const urlGet = 'https://budget-app-1a588-default-rtdb.firebaseio.com/salary.json';
const header = new Headers({ "Access-Control-Allow-Origin": "*" });

const fetchGetBudgetApp = async function (setIsLoadingGet, setErrorGet, changeSummary) {
    setIsLoadingGet(true)
    setErrorGet(null)

    try {
        const response = await fetch(urlGet, {
            header: header
        })
        if (!response.ok) {
            throw new Error('Somthing went wrong')
        }
        const data = await response.json();

        const loadedSalary = [];
        for (const key in data) {

            for (const innerKey in data[key]) {
                loadedSalary.push({
                    name: data[key][innerKey].name,
                    value: data[key][innerKey].value,
                    date: data[key][innerKey].date
                })
            }
        }
        changeSummary(loadedSalary)
    } catch (error) {
        setErrorGet(error.message)
        console.log(error.message)
    }
    setIsLoadingGet(false)
}

export default fetchGetBudgetApp;