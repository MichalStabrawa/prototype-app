const maxValue = (arr) => {
  const tab = [];
  for (const el of arr) {
    tab.push(el.value);
  }
  return Math.max(...tab);
};

export default maxValue;