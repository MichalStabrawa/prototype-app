import { useEffect, useState } from "react";
import classes from "./BudgetAppGolde.module.scss";
import Wrapper from "../../UI/Wrapper/Wrapper";

export default function BudgetAppGold({ props }) {
  const [gold, setGold] = useState([]);

  useEffect(() => {
    async function fetchGold() {
      const url = "http://api.nbp.pl/api/cenyzlota/";
      const header = new Headers({ "Access-Control-Allow-Origin": "*" });

      try {
        const response = await fetch(url, { header: header });
        if (!response.ok) {
          throw new Error("Somthing went wrong with api gold");
        }

        const data = await response.json();
        setGold(data);
      } catch (error) {
        console.log("Is Error fetch data API gold");
      }
    }

    fetchGold();
  }, []);

  console.log("GOLD");
  console.log(gold);

  return (<div>{gold[0].data} {gold[0].cena}PLN</div>);
}
