const urlGetSalary =
  "https://budget-app-1a588-default-rtdb.firebaseio.com/salary.json";

const header = new Headers({ "Access-Control-Allow-Origin": "*" });

const fetchBudgetAppSalary = async function (salary) {
  try {
    const response = await fetch(urlGetSalary, {
      method: "POST",
      body: JSON.stringify(salary),
      header: header,
      headers: {
        "Content-Type": "aplication/json",
      },
    });
    if (!response.ok) {
      throw new Error("Somthing went wrong");
    }
    const data = await response.json();
  } catch (error) {
    console.log(error.message);
  }
};

export default fetchBudgetAppSalary;
