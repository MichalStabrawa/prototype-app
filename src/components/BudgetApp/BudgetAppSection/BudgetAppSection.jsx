import classes from "./BudgetAppSection.module.scss";
import { FaExchangeAlt } from "react-icons/fa";
import { GiGoldStack } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";

const BudgetAppSection = ({ props, css, icon, title, children }) => {
  const additionalCss = css;
  return (
    <div className={`${classes.ba_section} ${classes[additionalCss]}`}>
      <div className={classes.wrapper_}>
        <h1 className={classes.title}>
          {icon === "gold" && (
            <span className={classes.icon_gold}>
              <GiGoldStack />
            </span>
          )}
          {icon === "exchange" && (
            <span className={classes.icon_exchange}>
              <FaExchangeAlt />
            </span>
          )}
             {icon === "salary" && (
            <span className={classes.icon_salary}>
              <GiReceiveMoney />
            </span>
          )}

          {title}
        </h1>
      </div>

      <div className={classes.ba_section_content}>{children}</div>
    </div>
  );
};

export default BudgetAppSection;
