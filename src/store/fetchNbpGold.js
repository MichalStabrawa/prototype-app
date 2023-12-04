const header = new Headers({ "Access-Control-Allow-Origin": "*" });

const fetchNbpGold = async function (setGold) {
  const url = "http://api.nbp.pl/api/cenyzlota/";

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

const fetchNbpGoldData = async function (currentDate, setData) {
  const url = "http://api.nbp.pl/api/cenyzlota/" + currentDate;

  try {
    const response = await fetch(url, { header: header });
    if (!response.ok) {
      throw new Error("Somthing went wrong with api gold");
    }

    const data = await response.json();

    setData(data[0]);
  } catch (error) {
    console.log("Is Error fetch data API gold");
  }
};

const fetchNbpGoldTopCount = async function (setGoldTopCount) {
  const url = "http://api.nbp.pl/api/cenyzlota/last/30";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Somthing went wrong with api gold top 10 count");
    }
    const data = await response.json();
    setGoldTopCount(data);
  } catch (error) {
    console.log("Is Error fetch data gold APi top 10 count");
  }
};

const fetchNbpGoldLast = async function (setGoldLastPrice) {
  const url = "http://api.nbp.pl/api/cenyzlota/last/2";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Somthing went wrong with fetch last gold price");
    }
    const data = await response.json();
    setGoldLastPrice(data[0]);
  } catch (error) {
    console.log("Is Error fetch data gold APi last");
  }
};

export {
  fetchNbpGold,
  fetchNbpGoldData,
  fetchNbpGoldTopCount,
  fetchNbpGoldLast,
};
