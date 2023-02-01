const urlGet = 'https://budget-app-1a588-default-rtdb.firebaseio.com/salary.json';
const header = new Headers({ "Access-Control-Allow-Origin": "*" });

const fetchGetBudgetApp = async function (setIsLoadingGet, setErrorGet) {
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
        console.log('Data')
        console.log(data)
        const loadedSalary = [];
        for (const key in data) {
            console.log(key)

            for (const innerKey in data[key]) {
                loadedSalary.push({
                    name: data[key][innerKey].name,
                    value: data[key][innerKey].value,
                    date: data[key][innerKey].date
                })
            }


        }

        console.log('SUMMARY')
        console.log(loadedSalary)

    } catch (error) {
        setErrorGet(error.message)
        console.log(error.message)
    }
    setIsLoadingGet(false)
}

export default fetchGetBudgetApp;