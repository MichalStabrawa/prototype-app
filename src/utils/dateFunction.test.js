import getCurrentDate, { getMonthYear } from './dateFunction'; // Import the functions to be tested

describe('getCurrentDate function', () => {
  it('should return the current date in "YYYY-MM-DD" format', () => {
    // Mocking the current date to ensure consistent results
    const originalDate = Date;
    global.Date = class extends Date {
      constructor() {
        super();
        return new originalDate('2024-02-20T00:00:00.000Z'); // Mocking the date to be "2024-02-20"
      }
    };

    expect(getCurrentDate()).toBe('2024-02-20'); // Ensure that the function returns the expected date
  });
});

describe('getMonthYear function', () => {
  it('should return the current month and year in "YYYY-MM" format', () => {
    // Mocking the current date to ensure consistent results
    const originalDate = Date;
    global.Date = class extends Date {
      constructor() {
        super();
        return new originalDate('2024-02-20T00:00:00.000Z'); // Mocking the date to be "2024-02-20"
      }
    };

    expect(getMonthYear()).toBe('2024-02'); // Ensure that the function returns the expected month and year
  });
});