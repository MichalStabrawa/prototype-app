export function calculateDateDifference(targetDate) {
  const targetDateObject = new Date(targetDate);

  const currentDate = new Date();

  const timeDifference = targetDateObject - currentDate;

  // Convert the time difference to days
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return daysDifference;
}
