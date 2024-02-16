import { filterSearchInputDate } from "./filterDateAcordion";

const setDataMock = jest.fn();
describe("filterSearchInputDate", () => {
  afterEach(() => {
    setDataMock.mockClear();
  });

  it("filter data correctly and call setData with filtered data", () => {
    //mock data
    const data = [
      { fullDate: "2023-01-01", value: "someValue1" },
      { fullDate: "2023-02-01", value: "someValue2" },
      { fullDate: "2023-01-01", value: "someValue3" },
      { fullDate: "2023-03-29", value: "someValue4" },
    ];

    // Expected filtered data for month '2023-01'
    const expectedFilteredData = [
      { fullDate: "2023-01-01", value: "someValue1" },
      { fullDate: "2023-01-01", value: "someValue3" },
    ];

    // Call the function with sample data
    filterSearchInputDate(data, "2023-01-01", setDataMock);
    expect(setDataMock).toHaveBeenCalledWith(expectedFilteredData);
  });

  it("should call setMonth with an empty array if no data matches the given month", () => {
    //mock data
    const data = [
      { fullDate: "2023-01-01", value: "someValue1" },
      { fullDate: "2023-02-01", value: "someValue2" },
      { fullDate: "2023-01-01", value: "someValue3" },
      { fullDate: "2023-03-29", value: "someValue4" },
    ];
    // Call the function with sample data
    filterSearchInputDate(data, "2023-01-02", setDataMock);
    expect(setDataMock).toHaveBeenCalledWith([]);
  });
});
