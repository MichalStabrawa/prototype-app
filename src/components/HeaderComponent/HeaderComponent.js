import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import getCompareLastActualValue from "../../utils/getCurrentLastValue";
import classes from "./HeaderComponent.module.scss";
import ResponsiveCarousel from "../Carousel/ResponsiveCarousel/ResponsiveCarousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FcCurrencyExchange } from "react-icons/fc";

const HeaderComponent = (props) => {
  const data = useSelector((state) => state.currency.data);
  const status = useSelector((state) => state.currency.status);
  const [dataCurrentLast, setDataCurrentLast] = useState(null);

  useEffect(() => {
    if (status === "success") {
      setDataCurrentLast(
        getCompareLastActualValue(data[1].rates, data[0].rates)
      );
    }
  }, [data]);

  return (
    <header className={classes.header}>
      <h1>
        Budget APP
        <span>
          <FcCurrencyExchange />
        </span>
      </h1>
      <p className={classes.description}>
        Check currency and gold rates, compare currencies, buy and sell.
      </p>
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
