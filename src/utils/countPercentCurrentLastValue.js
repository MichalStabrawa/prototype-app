export const countPercentCurrLastValue = (price,lastPrice)=> {
    return ((((100*price)/lastPrice)-100).toFixed(4))
}