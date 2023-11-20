import { useEffect, useState } from "react";
import classes from "./BudgetAppGold.module.scss";
import Wrapper from "../../UI/Wrapper/Wrapper";
import InputComponent from "../../UI/Input/InputComponent";
import getCurrentDate from "../../../utils/dateFunction";

export default function BudgetAppGold({ props }) {
  const [gold, setGold] = useState([]);
  const [data, setData] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    async function fetchGold() {
      const url = "http://api.nbp.pl/api/cenyzlota/" + currentDate;
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
  
  }, [currentDate]);

  function handleInputDate(e) {
    setCurrentDate(e.target.value);
    console.log(e.target.value);
  }

  return (
    <Wrapper>
      <div className={classes.ba_gold}>
        <p>Current gold price</p>
        <p>
          {data.data} <span>{data.cena}</span> PLN
        </p>
        <p>Current date: {getCurrentDate()} </p>
      </div>
      <div className={classes.ba_gold}>
        <InputComponent
          type="date"
          action={handleInputDate}
          value={currentDate}
        ></InputComponent>
        {currentDate>getCurrentDate()&& <p className={classes.info}>Wrong DATE!!!! Change for currently date or less</p>}
      </div>
    </Wrapper>
  );
}
