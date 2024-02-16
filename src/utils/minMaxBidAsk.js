 function minMaxBidAsk(data, status, setMin, setMax) {
  if (status === "success") {
    const min = [...data.rates].reduce((prev, next) =>
      prev.ask < next.ask ? prev : next
    );
    const max = [...data.rates].reduce((prev, next) =>
      prev.ask > next.ask ? prev : next
    );

    setMin(min);
    setMax(max);
  }
}

export default minMaxBidAsk
