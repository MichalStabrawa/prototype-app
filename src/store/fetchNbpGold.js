const fetchNbpGold = async function (setGold) {
  const url = "http://api.nbp.pl/api/cenyzlota/";
  const header = new Headers({ "Access-Control-Allow-Origin": "*" });

  try {
    const response = await fetch(url, { header: header });

    if (!response.ok) {
      throw new Error("Somthing went wrong with goldAPi");
    }

    const data = await await response.json();
    setGold(data[0]);
  } catch (error) {
    console.log(error);
  }
};

export default fetchNbpGold;
