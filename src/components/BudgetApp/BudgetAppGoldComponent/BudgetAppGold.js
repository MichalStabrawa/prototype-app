import { useEffect, useState } from "react";
import classes from "./BudgetAppGolde.module.scss";
import Wrapper from "../../UI/Wrapper/Wrapper";

async function fetchGold() {
    const url = "http://api.nbp.pl/api/cenyzlota/";
    const header = new Headers({ "Access-Control-Allow-Origin": "*" });

    try {
      const response = await fetch(url, { header: header });
      if (!response.ok) {
        throw new Error("Somthing went wrong with api gold");
      }

      const data = await response.json();

      return data;
    } catch (error) {
        console.log('Is Error fetch data API gold')
    }
  }

export default function BudgetAppGold({ props }) {
  const [gold, setGold] = useState([]);



  const dataGold = fetchGold();




  console.log('GOLD')
  console.log(dataGold.date)

  return (<h3>Test gold</h3>);
}
