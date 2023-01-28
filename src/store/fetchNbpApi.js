const urlLastDay = 'http://api.nbp.pl/api/exchangerates/tables/a/last/2';
const header = new Headers({ "Access-Control-Allow-Origin": "*" });

const fetchNBP = async function (setIsLoading, setError, setExchange, dispatchDate) {
    setIsLoading(true)
    setError(null)

    try {
        const response = await fetch(urlLastDay, {
            header: header
        })
        if (!response.ok) {
            throw new Error('Somthing went wrong')
        }
        const data = await response.json();
        const lastDataNBP = data[0].effectiveDate;
        const transformesExchange = data[0].rates.map(el => {
            console.log(el)
            return {
                name: el.currency,
                code: el.code,
                value: el.mid
            }
        })

        setExchange(transformesExchange);
        dispatchDate({
            type: 'addLastDate',
            lastDate: lastDataNBP
        })
    } catch (error) {
        setError(error.message)
        console.log(error.message)
    }
    setIsLoading(false)
}

export default fetchNBP;