import { React, useState, useEffect } from "react";
import classes from "./iconArrow.module.scss";

import ArrowUp from "./../../../assets/icons8-up-arrow-48.png";
import ArrowDown from "../../../assets/icons8-down-arrow-48.png";
import ArrowRight from "../../../assets/icons8-right-48.png";
const IconArrow = (props) => {
  const { arrow } = props;
  const [src, setSrc] = useState("");
  console.log("ARROW");
  console.log(arrow);
  const getSrc = () => {
    if (arrow === null) {
      setSrc(ArrowRight);
    } else if (arrow === "red") {
      setSrc(ArrowDown);
    } else if (arrow === "green") {
      setSrc(ArrowUp);
    } else {
      return null;
    }
  };

  useEffect(() => {
    getSrc();
  }, [props.arrow]);
  return <img src={src} className={classes.icon_arow} alt="" />;
};

export default IconArrow;
