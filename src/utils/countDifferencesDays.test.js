import { calculateDateDifference } from "./countDifferencesInDays";


describe('calculateDateDifference', () => {
    it('should return 0 for the same date', () => {
      const currentDate = new Date();
      const result = calculateDateDifference(currentDate);
      expect(result).toBe(0);
    });
  
    it('should return positive number for future date', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 10); // 10 days in future
      const result = calculateDateDifference(futureDate);
      expect(result).toBe(10);
    });
  
    it('should return negative number for past date', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 10); // 10 days in past
      const result = calculateDateDifference(pastDate);
      expect(result).toBe(-10);
    });
  });