import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import getCompareLastActualValue from "../../utils/getCurrentLastValue";
import classes from "./HeaderComponent.module.scss";
import ResponsiveCarousel from "../Carousel/ResponsiveCarousel/ResponsiveCarousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FcCurrencyExchange } from "react-icons/fc";
import Button from "react-bootstrap/Button";

const HeaderComponent = ({ scrollToRef }) => {
  const data = useSelector((state) => state.currency.data);
  const status = useSelector((state) => state.currency.status);
  const [dataCurrentLast, setDataCurrentLast] = useState(null);

  const scrollToComponent = () => {
    scrollToRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (status === "success") {
      setDataCurrentLast(
        getCompareLastActualValue(data[1].rates, data[0].rates)
      );
    }
  }, [data]);

  return (
    <header className={classes.header}>
      <div className={classes.header_content}>
        {" "}
        <h1>
          Budget APP
          <span>
            <FcCurrencyExchange />
          </span>
        </h1>
        <p className={classes.description}>
          Check currency and gold rates, compare currencies, buy and sell.
          Manage your household budget
        </p>
      </div>
      <div className={classes.btn_wrapper}>
        <Button onClick={scrollToComponent} size="lg">
          Get started
        </Button>
        <Link to="/register">
          <Button className={classes.button_header} size="lg" variant="success">
            Register
          </Button>
        </Link>
      </div>
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
