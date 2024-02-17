import getCurrentPrevDifferences from "./getCurrentPrevDifferences";

describe("getCurrentPrevDifferences function", () => {
  it('should return "green" if value is greater than lastValue', () => {
    expect(getCurrentPrevDifferences(5, 3)).toBe("green");
  });

  it('should return "red" if value is less than lastValue', () => {
    expect(getCurrentPrevDifferences(3, 5)).toBe("red");
  });

  it("should return null if value is equal to lastValue", () => {
    expect(getCurrentPrevDifferences(5, 5)).toBe(null);
  });
});
