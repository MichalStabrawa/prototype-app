import { useState, useReducer, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import InputComponent from "../../UI/Input/InputComponent";
import Button from "../../UI/Button/Button";
import BudgetAppSection from "../BudgetAppSection/BudgetAppSection";
import classes from "./BudgetAppComponent.module.scss";
import buttonStyles from "./../../UI/Button/Button.module.scss";
import BudgetAppTable from "../BudgetAppTable/BudgetAppTable";
import Reducer from "./../../../store/store";
import BudgetAppExchange from "../BudgetAppExchangeComponent/BudgetAppExchange";
import fetchBudgetAppSalary from "../../../store/fetchBudgetAppSalary";
import getCurrentDate from "../../../utils/dateFunction";
import fetchGetBudgetApp from "../../../store/fetchGetBudgetApp";
import fetchBudgetAppExpenses from "../../../store/fetchBudgetAppExpenses";
import fetchGetBudgetAppExspenses from "../../../store/fetchGetBudgetAppExspenses";

import BudgetAppGold from "../BudgetAppGoldComponent/BudgetAppGold";
import AddSalary from "../../AddSalary/AddSalary";
import ButtonBtn from "react-bootstrap/Button";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import maxValue from "../../../utils/maxValue";
import ShowSavedSalary from "../../ShowSavedSalary/ShowSavedSalary";
import AddExpenses from "../../AddExpenses/AddExpenses";
import ShowSavedExpenses from "../../ShowSavedExpenses/ShowSavedExpenses";

const {
  reducer,
  initialState,
  reducerSummary,
  initialStateSummaryExpenses,
  reducerSummaryNameValueExpenses,
  reducerSummarySalary,
  fetchNbpTopCountReducer,
} = Reducer;

const BudgetAppComponent = ({ sectionRef }) => {
  const [summary, changeSummary] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [stateSummary, dispatchSummary] = useReducer(
    reducerSummary,
    initialStateSummaryExpenses
  );
  const [stateSalarySummary, dispatchSalarySummary] = useReducer(
    reducerSummarySalary,
    []
  );
  const [stateExpenses, dispatchExpenses] = useReducer(
    reducerSummaryNameValueExpenses,
    []
  );
  const [stateUploadLocal, setStateUploadLocal] = useState([]);
  const [exchangeValue, setExchangeValue] = useState("1");
  const [isLoadingGet, setIsLoadingGet] = useState(false);
  const [error, setIsGetError] = useState(null);
  const [emptyInputSalary, setEmptyInputSalary] = useState(true);
  const [emptyExpensesInput, setEmptyExpensesInput] = useState(true);
  const [filter, setFilter] = useState(false);
  const [filterSalaryValue, setFilterSalaryValue] = useState(null);
  const [saveSalary, setSaveSalary] = useState(false);
  const [nbpTopCountData, dispatchNbPTopCountData] = useReducer(
    fetchNbpTopCountReducer,
    []
  );
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const dataUser = useSelector((state) => state.fetchUserSalary.data);
  const status = useSelector((state) => state.fetchUserSalary.status);

  const currentDate = getCurrentDate();
  const maxVal = maxValue(stateUploadLocal);

  useEffect(() => {
    changeSummary(stateSalarySummary);
  }, [stateSalarySummary]);

  useEffect(() => {
    setStateUploadLocal(stateExpenses);
  }, [stateExpenses]);

  useEffect(() => {
    fetchGetBudgetApp(setIsLoadingGet, setIsGetError, changeSummary);
  }, []);

  useEffect(() => {
    fetchGetBudgetAppExspenses(setStateUploadLocal);
  }, []);

  const addHandlerInput = (e) => {
    if (e.target.name === "NameSalary") {
      dispatch({
        type: "addName",
        name: e.target.value,
      });
    }
    if (e.target.name === "Salary") {
      dispatch({
        type: "addValue",
        value: e.target.value,
      });
    }
    if (e.target.name === "NameExpenses") {
      dispatchSummary({
        type: "addExspansesName",
        nameSalary: e.target.value,
      });
    }
    if (e.target.name === "ValueExpenses") {
      dispatchSummary({
        type: "addExspansesValue",
        salaryValue: e.target.value,
      });
    }
    if (e.target.name === "Count") {
      setExchangeValue(e.target.value);
    }
  };

  const clearInputNameValue = () => {
    dispatch({
      type: "addName",
      name: "",
    });
    dispatch({
      type: "addValue",
      value: "",
    });
  };

  const clearInputExspenses = () => {
    dispatchSummary({
      type: "addExspansesName",
      nameSalary: "",
    });
    dispatchSummary({
      type: "addExspansesValue",
      salaryValue: "",
    });
  };

  const addNameAndSalary = () => {
    if (state.name === "" || state.value === "") {
      setEmptyInputSalary(false);
      return null;
    } else {
      setEmptyInputSalary(true);
      dispatchSalarySummary({
        type: "salarySummary",
        ex: { name: state.name, value: state.value, date: currentDate },
      });
      dispatch({
        type: "addName",
        name: "",
      });
      dispatch({
        type: "addValue",
        value: "",
      });
      setSaveSalary(true);
    }
  };

  const setLocalStorageExspenses = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    localStorage.setItem("exspenses", JSON.stringify(stateExpenses));
  };

  const addExpenses = () => {
    if (stateSummary.nameSalary === "" || stateSummary.salaryValue === "") {
      setEmptyExpensesInput(false);
      return null;
    } else {
      setEmptyExpensesInput(true);
      dispatchExpenses({
        type: "expensesSummary",
        ex: {
          name: stateSummary.nameSalary,
          value: stateSummary.salaryValue,
          date: currentDate,
        },
      });
      dispatchSummary({
        type: "addExspansesName",
        nameSalary: "",
      });
      dispatchSummary({
        type: "addExspansesValue",
        salaryValue: "",
      });
    }
  };

  const totalSalaryValue = (item) => {
    let total = 0;

    if (summary !== undefined) {
      item.forEach((el) => {
        total = total + parseFloat(el.value);
      });
    } else if (summary === undefined) {
      return 0;
    }

    return total;
  };

  const total = totalSalaryValue(summary);
  const totalExspenses = totalSalaryValue(stateUploadLocal);

  //total use reduce() function

  const totalReduce = summary.reduce(
    (total, currentValue) => total + parseFloat(currentValue.value),
    0
  );

  const addSaveSalaryHandler = () => {
    if (auth === "true") {
      fetchBudgetAppSalary(summary);

      setSaveSalary(false);
      setTimeout(() => {
        fetchGetBudgetApp(setIsLoadingGet, setIsGetError, changeSummary);
      }, 500);
    } else {
    }
  };

  const addSaveExpensesHandler = () => {
    if (auth === "true") {
      fetchBudgetAppExpenses(stateExpenses);
    } else if (auth === "false") {
      alert(`Login Auth is expenses ${auth}`);
      return;
    }
  };

  //show &hide filter section
  const showAndHideFilter = () => {
    setFilter(!filter);
  };
  const filters = () => {
    return summary.filter((el) => el.date === filterSalaryValue);
  };

  const addHandlerFilterSalary = (e) => {
    const index = e.target.selectedIndex;
    const option = e.target.childNodes[index];
    setFilterSalaryValue(e.target.value);
  };

  useEffect(() => {
    changeSummary(filters);
  }, [filterSalaryValue]);

  return (
    <section className={classes.budgetapp}>
      <div className={classes.bapp_wrapper}>
        <BudgetAppSection title="Exchange rates" css="ba_section-full">
          <BudgetAppExchange
            css="wrapper-content"
            exchangeValue={exchangeValue}
            addHandlerInput={addHandlerInput}
          />
        </BudgetAppSection>
        <BudgetAppSection title="Gold price" icon="gold" css="ba_section-full">
          <BudgetAppGold />
        </BudgetAppSection>

        {auth && (
          <>
            <BudgetAppSection
              title="Add salary or other income"
              css="ba_section_full_mobile"
            >
              {" "}
              <div>
                <AddSalary sectionRef={sectionRef} />
              </div>
              <div>
                <AddExpenses />
              </div>
            </BudgetAppSection>{" "}
            <BudgetAppSection
              title="Last salary values"
              css="ba_section_full_mobile"
            >
              <ShowSavedSalary filter={false}/>
              <div>
                <ShowSavedExpenses title="expenses"/>
              </div>
            </BudgetAppSection>
            <BudgetAppSection css="ba_section-full">
              <div className={classes.go_to}>
                <h5>Check the exact status of your budget.</h5>
                <p>Control your income and expenses.View charts and analyses</p>
                <Link to="user">
                  <ButtonBtn variant="outline-info">Go to My Budget</ButtonBtn>
                </Link>
              </div>
            </BudgetAppSection>
            {false && (
              <>
                {" "}
                <BudgetAppSection
                  title="Add Exspenses"
                  css="ba_section_full_mobile"
                >
                  <InputComponent
                    name="NameExpenses"
                    type="text"
                    placeholder="Add name"
                    action={addHandlerInput}
                    value={stateSummary.nameSalary}
                  />
                  <InputComponent
                    name="ValueExpenses"
                    type="number"
                    placeholder="Add value"
                    action={addHandlerInput}
                    value={stateSummary.salaryValue}
                  />
                  {!emptyExpensesInput && (
                    <p className={classes.invalid}>One input is empty!!!</p>
                  )}
                  <div className={classes.bapp_btn}>
                    <Button name="Add" click={addExpenses} />
                    <Button
                      name="Clear"
                      color={buttonStyles.btn_red}
                      click={clearInputExspenses}
                    />
                  </div>
                  <div className={classes.bar_chart}>
                    {stateUploadLocal.length !== 0 && (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          width={500}
                          height={400}
                          data={stateUploadLocal}
                          margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                          }}
                        >
                          <CartesianGrid strokeDasharray="5 3" />
                          <XAxis dataKey="name" />
                          <YAxis
                            domain={["auto", maxVal]}
                            allowDataOverflow={true}
                          />
                          <Tooltip />
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#8884d8"
                            fill="#8884d8"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </BudgetAppSection>
                <BudgetAppSection
                  title="Total Exspenses"
                  css="ba_section_full_mobile"
                >
                  {auth.toString()}
                  {stateExpenses.length !== 0 && (
                    <Button name="Save" click={addSaveExpensesHandler} />
                  )}
                  <BudgetAppTable
                    summary={stateUploadLocal}
                    totalSumary={totalExspenses}
                  ></BudgetAppTable>
                  {stateExpenses.length ? (
                    <Button
                      name="Save 1"
                      click={setLocalStorageExspenses}
                      color={buttonStyles.btn_footer}
                    />
                  ) : null}
                </BudgetAppSection>{" "}
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default BudgetAppComponent;
