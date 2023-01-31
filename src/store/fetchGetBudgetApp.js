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
        const loadedSalary = [];
        for (const key in data) {
            loadedSalary.push({
                id: key,
                title: data[key].date,

            })
            const name = data[key].summary;

            console.log('SUMMARY')
            console.log(name)

        }

        console.log('LOADGET')
        console.log(loadedSalary)



    } catch (error) {
        setErrorGet(error.message)
        console.log(error.message)
    }
    setIsLoadingGet(false)
}

export default fetchGetBudgetApp;