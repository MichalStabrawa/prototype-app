import getCompareLastActualValue from "./getCurrentLastValue";

describe("getCompareLastActualValue function", () => {
  it("should return empty array if data is falsy", () => {
    expect(getCompareLastActualValue(null, [{ code: "USD", mid: 1 }])).toEqual(
      undefined
    );
  });

  it("should compare data with dataLast and return the comparison result", () => {
    const data = [
      { code: "USD", currency: "US Dollar", mid: 1 },
      { code: "EUR", currency: "Euro", mid: 0.9 },
    ];
    const dataLast = [
      { code: "USD", currency: "US Dollar", mid: 1 },
      { code: "EUR", currency: "Euro", mid: 0.85 },
    ];
    const expected = [
      { code: "USD", currency: "US Dollar", mid: 1, state: "=", lastValue: 1 },
      { code: "EUR", currency: "Euro", mid: 0.9, state: "+", lastValue: 0.85 },
    ];
    expect(getCompareLastActualValue(data, dataLast)).toEqual(expected);
  });

  it("should get Euro +, and $ +", () => {
    const data = [
      { code: "USD", currency: "US Dollar", mid: 4.1 },
      { code: "EUR", currency: "Euro", mid: 4.4 },
    ];
    const dataLast = [
      { code: "USD", currency: "US Dollar", mid: 4 },
      { code: "EUR", currency: "Euro", mid: 4.3 },
    ];
    const expected = [
      {
        code: "USD",
        currency: "US Dollar",
        mid: 4.1,
        state: "+",
        lastValue: 4,
      },
      { code: "EUR", currency: "Euro", mid: 4.4, state: "+", lastValue: 4.3 },
    ];
    expect(getCompareLastActualValue(data, dataLast)).toEqual(expected);
  });

  it("should get Euro -, and $ -", () => {
    const data = [
      { code: "USD", currency: "US Dollar", mid: 4.1 },
      { code: "EUR", currency: "Euro", mid: 4.4 },
    ];
    const dataLast = [
      { code: "USD", currency: "US Dollar", mid: 4.2 },
      { code: "EUR", currency: "Euro", mid: 4.5 },
    ];
    const expected = [
      {
        code: "USD",
        currency: "US Dollar",
        mid: 4.1,
        state: "-",
        lastValue: 4.2,
      },
      { code: "EUR", currency: "Euro", mid: 4.4, state: "-", lastValue: 4.5 },
    ];
    expect(getCompareLastActualValue(data, dataLast)).toEqual(expected);
  });

  it("should get Euro -, and $ +", () => {
    const data = [
      { code: "USD", currency: "US Dollar", mid: 4 },
      { code: "EUR", currency: "Euro", mid: 4.4 },
    ];
    const dataLast = [
      { code: "USD", currency: "US Dollar", mid: 3.8 },
      { code: "EUR", currency: "Euro", mid: 4.5 },
    ];
    const expected = [
      {
        code: "USD",
        currency: "US Dollar",
        mid: 4,
        state: "+",
        lastValue: 3.8,
      },
      { code: "EUR", currency: "Euro", mid: 4.4, state: "-", lastValue: 4.5 },
    ];
    expect(getCompareLastActualValue(data, dataLast)).toEqual(expected);
  });
  it("should get Euro +, and $ -", () => {
    const data = [
      { code: "USD", currency: "US Dollar", mid: 4 },
      { code: "EUR", currency: "Euro", mid: 4.5 },
    ];
    const dataLast = [
      { code: "USD", currency: "US Dollar", mid: 4.1 },
      { code: "EUR", currency: "Euro", mid: 4.4 },
    ];
    const expected = [
      {
        code: "USD",
        currency: "US Dollar",
        mid: 4,
        state: "-",
        lastValue: 4.1,
      },
      { code: "EUR", currency: "Euro", mid: 4.5, state: "+", lastValue: 4.4 },
    ];
    expect(getCompareLastActualValue(data, dataLast)).toEqual(expected);
  });
});
