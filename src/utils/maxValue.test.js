import maxValue from "./maxValue";

const maxValueDuplicate = [{ value: 10 }, { value: 5 }, { value: 10 }];
const maxNegative = [
  { value: -1 },
  { value: -2 },
  { value: -3 },
  { value: -6 },
];

describe("maxValue functions", () => {
  it("returns the maximum value in the array", () => {
    expect(maxValue([{ value: 1 }, { value: 2 }, { value: 3 }])).toBe(3);
  });
  it("return maximum value with array with duplicate", () => {
    expect(maxValue(maxValueDuplicate)).toBe(10);
  });
  it("return the maxValue with negative numbers array", () => {
    expect(maxValue(maxNegative)).toBe(-1);
  });
  it("returns undefined for an empty array", () => {
    expect(maxValue([])).toBe(-Infinity);
  });
});
