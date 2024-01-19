export const sortSalaryExpenses = (data, selectedRadio, setData) => {
  if (selectedRadio === "az") {
    const sortedArrayAZ = [...data].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    setData(sortedArrayAZ);
  } else if (selectedRadio === "za") {
    const sortedArrayZA = [...data].sort((a, b) =>
      b.name.localeCompare(a.name)
    );
    setData(sortedArrayZA);
  } else {
    return null;
  }
};
