import minMaxBidAsk from "./minMaxBidAsk";

describe("minMaxBidAsk", () => {
  test("should call setMin and setMax with the correct values when status is success", () => {
    const data = {
      rates: [{ ask: 10 }, { ask: 15 }, { ask: 12 }, { ask: 20 }],
    };

    const setMin = jest.fn();
    const setMax = jest.fn();

    minMaxBidAsk(data, "success", setMin, setMax);

    expect(setMin).toHaveBeenCalledWith({ ask: 10 });
    expect(setMax).toHaveBeenCalledWith({ ask: 20 });
  });

  test("should not call setMin and setMax when status is not success", () => {
    const data = {
      rates: [{ ask: 10 }, { ask: 15 }, { ask: 12 }, { ask: 20 }],
    };

    const setMin = jest.fn();
    const setMax = jest.fn();

    minMaxBidAsk(data, "failure", setMin, setMax);

    expect(setMin).not.toHaveBeenCalled();
    expect(setMax).not.toHaveBeenCalled();
  });
});
