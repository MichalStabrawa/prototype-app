const fetchNbpGoldData = async function (currentDate, setData) {
  const url = "http://api.nbp.pl/api/cenyzlota/" + currentDate;
  const header = new Headers({ "Access-Control-Allow-Origin": "*" });

  try {
    const response = await fetch(url, { header: header });
    if (!response.ok) {
      throw new Error("Somthing went wrong with api gold");
    }
    console.log(response);
    const data = await response.json();
    console.log("Data");
    console.log(data[0]);

    setData(data[0]);
  } catch (error) {
    console.log("Is Error fetch data API gold");
  }
};

export default fetchNbpGoldData
