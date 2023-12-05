const getCompareLastActualValue = (data, dataLast) => {
  let tab = [];
  if (data) {
    for (const el of data) {
      for (const i of dataLast) {
        if (el.code === i.code && el.mid === i.mid) {
          tab.push({
            code: el.code,
            currency: el.currency,
            mid: el.mid,
            state: "=",
            lastValue: i.mid,
          });
        } else if (el.code === i.code && el.mid > i.mid) {
          tab.push({
            code: el.code,
            currency: el.currency,
            mid: el.mid,
            state: "+",
            lastValue: i.mid,
          });
        } else if (el.code === i.code && el.mid < i.mid) {
          tab.push({
            code: el.code,
            currency: el.currency,
            mid: el.mid,
            state: "-",
            lastValue: i.mid,
          });
        }
      }
    }

    return tab;
  }
};

export default getCompareLastActualValue;
