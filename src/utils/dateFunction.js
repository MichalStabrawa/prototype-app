export default function getCurrentDate() {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  if (date < 10) {
    return `${year}-${month < 10 ? `0${month}` : `${month}`}-0${date}`;
  }
  return `${year}-${month < 10 ? `0${month}` : `${month}`}-${date}`;
}
