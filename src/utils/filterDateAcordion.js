export const filterSearchInputDate = (dataSaved, search, setData) => {
  const filterData = [...dataSaved].filter((el) => el.fullDate === search);

  setData(filterData);
};
