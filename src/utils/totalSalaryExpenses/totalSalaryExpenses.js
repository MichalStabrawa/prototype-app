export const sumTotalSalaryExpenses = (status, data) => {
  if (status === "success") {
    console.log('DATAEXPENSES')
    const sum = [...data].reduce((prev, curr) => {
      return prev + +curr.expenses;
    }, 0);

    return sum;
  }
};
