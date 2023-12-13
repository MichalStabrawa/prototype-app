import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import classes from "./ResponsiveCarousel.module.scss";

const ResponsiveCarousel = ({ data }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    slickNext: true,
    slickPlay: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={classes.slider}>
      <Slider {...settings}>
        {data &&
          data.rates.map((el, index) => (
            <div className={classes.slider_item} key={index}>
              <p className={classes.pln}><span>PLN/</span>{el.code}</p>
              <p>{el.mid}</p>
              <span>date {data.effectiveDate}</span>
              <br></br>
              <span>{el.code}</span>
            </div>
          ))}
      </Slider>{" "}
    </div>
  );
};

export default ResponsiveCarousel;
