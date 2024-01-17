export const filterSearchData = (isChecked,dataSaved,search,setData) => {
    if (!isChecked) {
      const filterData = [...dataSaved].filter((el) =>
        el.name.toLowerCase().includes(search)
      );
      console.log(filterData);
      setData(filterData);
    } else {
      const filterData = [...dataSaved].filter((el) =>
        el.expenses.toLowerCase().includes(search)
      );
      console.log(filterData);
      setData(filterData);
    }
  };