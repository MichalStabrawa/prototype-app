const url = 'http://api.nbp.pl/api/exchangerates/tables/A';
const header = new Headers({ "Access-Control-Allow-Origin": "*" });

const fethNbpCurrent = async function (setIsLoading, setError, setExchange, dispatchDate) {
    setIsLoading(true)
    setError(null)

    try {
        const response = await fetch(url, {
            header: header
        })
        if (!response.ok) {
            throw new Error('Somthing went wrong')
        }
        const data = await response.json();
        const currentDataNBP = data[0].effectiveDate;
        const transformesExchange = data[0].rates.map(el => {

            return {
                name: el.currency,
                code: el.code,
                value: el.mid
            }
        })

        setExchange(transformesExchange);
        dispatchDate({
            type: 'addCurentDate',
            currentDate: currentDataNBP
        })
    } catch (error) {
        setError(error.message)
        console.log(error.message)
    }
    setIsLoading(false)
}

export default fethNbpCurrent;