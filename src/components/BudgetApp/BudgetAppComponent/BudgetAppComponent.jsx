import { useState, useReducer, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import BudgetAppSection from "../BudgetAppSection/BudgetAppSection";
import classes from "./BudgetAppComponent.module.scss";

import Reducer from "../../../store/store";
import BudgetAppExchange from "../BudgetAppExchangeComponent/BudgetAppExchange";
import fetchBudgetAppSalary from "../../../store/fetchBudgetAppSalary";
import getCurrentDate from "../../../utils/dateFunction";
import fetchGetBudgetApp from "../../../store/fetchGetBudgetApp";
import fetchBudgetAppExpenses from "../../../store/fetchBudgetAppExpenses";
import fetchGetBudgetAppExspenses from "../../../store/fetchGetBudgetAppExspenses";
import { getMonthYear } from "../../../utils/dateFunction";
import BudgetAppGold from "../BudgetAppGoldComponent/BudgetAppGold";
import AddSalary from "../../AddSalary/AddSalary";
import ButtonBtn from "react-bootstrap/Button";

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

const BudgetAppComponent = ({ sectionRef, scrollToRef }) => {
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
  const monthYear = getMonthYear();

  const formData = new FormData();
  formData.append('key1', 'value1');
  formData.append('key2', 'value2');


  formData.append('key1', 'value1');
  formData.append('key2', 'value2');
  
  console.log('FormData contents:');
  for (const [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

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
    <section ref={scrollToRef} className={classes.budgetapp}>
      <div className={classes.bapp_wrapper}>
        <BudgetAppSection
          title="Exchange rates"
          icon="exchange"
          css="ba_section-full"
        >
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
              icon="salary"
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
              icon="salaryTab"
            >
              <ShowSavedSalary filter={false} monthYear={monthYear} />
              <div>
                <ShowSavedExpenses
                  title="Expenses"
                  monthYear={monthYear}
                  divider={true}
                />
              </div>
            </BudgetAppSection>
            <BudgetAppSection css="ba_section-full" background="my_budget">
              <div className={classes.go_to}>
                <h5>Check the exact status of your budget.</h5>
                <p>Control your income and expenses.View charts and analyses</p>
                <Link to="user">
                  <ButtonBtn variant="outline-info">Go to My Budget</ButtonBtn>
                </Link>
              </div>
            </BudgetAppSection>
          </>
        )}
      </div>
    </section>
  );
};

export default BudgetAppComponent;
