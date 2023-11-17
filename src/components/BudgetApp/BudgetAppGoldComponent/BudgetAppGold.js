import { useEffect, useState } from "react";
import classes from "./BudgetAppGolde.module.scss";
import Wrapper from "../../UI/Wrapper/Wrapper";
import InputComponent from "../../UI/Input/InputComponent";

export default function BudgetAppGold({ props }) {
  const [gold, setGold] = useState([]);
  const [data, setData] = useState("");

  useEffect(() => {
    async function fetchGold() {
      const url = "http://api.nbp.pl/api/cenyzlota/";
      const header = new Headers({ "Access-Control-Allow-Origin": "*" });

      try {
        const response = await fetch(url, { header: header });
        if (!response.ok) {
          throw new Error("Somthing went wrong with api gold");
        }
        console.log(response);
        const data = await response.json();
        setGold(data);
        setData(data[0]);
      } catch (error) {
        console.log("Is Error fetch data API gold");
      }
    }

    fetchGold();
  }, []);

  return (
    <Wrapper>
      <div className={classes.ba_gold}>
        {data.data} {data.cena}PLN
      </div>
      <div>
        <InputComponent type="date"></InputComponent>
      </div>
    </Wrapper>
  );
}
