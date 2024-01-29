export const filterSearchData = (isChecked, dataSaved, search, setData) => {
  console.log(dataSaved)
  if (!isChecked) {
    const filterData = [...dataSaved].filter((el) =>
      el.name.toLowerCase().includes(search.toLowerCase())
    );
    setData(filterData);
  } else {
    const filterData = [...dataSaved].filter((el) =>
      el.expenses.toString().includes(search)
    );

    setData(filterData);
  }
};
