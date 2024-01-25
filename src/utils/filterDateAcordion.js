export const filterSearchInputDate = ( dataSaved, search, setData) => {
   console.log('search2')
   console.log(search)
      const filterData = [...dataSaved].filter((el) =>
        el.fullDate === search
      );
      setData(filterData);
    } 
