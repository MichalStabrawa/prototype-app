import { filterMonthData } from "./filterMonth";

// Mocking setMonth function with filterMonthData

const setMonthMock = jest.fn();

describe("filterMonthData", () => {
  afterEach(() => {
    setMonthMock.mockClear();
  });

  it("filter data correctly and call setMonth with filtered data", () => {
    //mock data
    const data = [
      { monthYear: "2023-01", value: "someValue1" },
      { monthYear: "2023-02", value: "someValue2" },
      { monthYear: "2023-01", value: "someValue3" },
      { monthYear: "2023-03", value: "someValue4" },
    ];

    // Expected filtered data for month '2023-01'
    const expectedFilteredData = [
      { monthYear: "2023-01", value: "someValue1" },
      { monthYear: "2023-01", value: "someValue3" },
    ];

    // Call the function with sample data
    filterMonthData(data, "someStatus", "2023-01", setMonthMock);
    // Expect setMonth to be called with the expectedFilteredData
    expect(setMonthMock).toHaveBeenCalledWith(expectedFilteredData);
  });

  it("should call setMonth with an empty array if no data matches the given month", () => {
    // Sample data
    const data = [
      { monthYear: "2023-01", value: "someValue1" },
      { monthYear: "2023-02", value: "someValue2" },
      { monthYear: "2023-03", value: "someValue3" },
    ];

    // Call the function with a month that doesn't exist in the data
    filterMonthData(data, "someStatus", "2023-04", setMonthMock);

    // Expect setMonth to be called with an empty array
    expect(setMonthMock).toHaveBeenCalledWith([]);
  });
});
