import {useParams} from 'react-router-dom'


function ExchangeDetails() {
    const params = useParams()
    console.log(params.id)
    return(<><h1>Exchange Details</h1>{params.id}</>
        
    )
}

export default ExchangeDetails