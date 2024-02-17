import { countPercentCurrLastValue } from "./countPercentCurrentLastValue";

const priceMock = [
  { price: 50, lastPrice: 100 },
  { price: 120, lastPrice: 100 },
  { price: 50, lastPrice: 50 },
];

describe("Count percent price compare lastPrice", () => {
  it("should return -50", () => {
    const value = countPercentCurrLastValue(
      priceMock[0].price,
      priceMock[0].lastPrice
    );
    expect(+value).toBe(-50.0);
  });
  it("should return 20", () => {
    const value = countPercentCurrLastValue(
      priceMock[1].price,
      priceMock[1].lastPrice
    );
    expect(+value).toBe(20);
  });
  it("should return 0", () => {
    const value = countPercentCurrLastValue(
      priceMock[2].price,
      priceMock[2].lastPrice
    );
    expect(+value).toBe(0);
  });
});
