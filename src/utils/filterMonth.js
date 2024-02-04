export const filterMonthData = (data, status, month, setMonth) => {
 

  const dataMonth = [...data].filter((el) => el.monthYear === month);
  setMonth(dataMonth);
  console.log('DataMonth Filter')
  console.log(dataMonth);
};
