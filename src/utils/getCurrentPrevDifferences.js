const getCurrentPrevDifferences = (value, lastValue) => {
    if (value - lastValue > 0) {
        return 'green'
    } else if (value - lastValue < 0) {
        return 'red'
    } else {
        return null
    }
}
export default getCurrentPrevDifferences;