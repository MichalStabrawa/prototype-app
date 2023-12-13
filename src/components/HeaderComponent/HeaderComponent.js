import { useState, useEffect } from "react";
import { useSelector } from "react-redux";


import getCompareLastActualValue from "../../utils/getCurrentLastValue";
import classes from "./HeaderComponent.module.scss";
import ResponsiveCarousel from "../Carousel/ResponsiveCarousel/ResponsiveCarousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeaderComponent = (props) => {
  const data = useSelector((state) => state.currency.data);
  const status = useSelector((state) => state.currency.status);
  const [dataCurrentLast, setDataCurrentLast] = useState(null);

  console.log(
    "DATACURRENCYSET!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
  );
  console.log(dataCurrentLast);

  console.log("Header");
  useEffect(() => {
    if (status === "success") {
      console.log(status);
      console.log("USEDATA");
      console.log(data);
      setDataCurrentLast(
        getCompareLastActualValue(data[1].rates, data[0].rates)
      );
    }
  }, [data]);

  return (
    <header className={classes.header}>
      <h1>Header lorem ipsum</h1>
      <p>Lorem ipsum description</p>
      {status === "success" && dataCurrentLast && (
        <ResponsiveCarousel
          data={dataCurrentLast}
          effectiveDate={data[1].effectiveDate}
          slidesToShow={5}
        />
      )}
    </header>
  );
};

export default HeaderComponent;
