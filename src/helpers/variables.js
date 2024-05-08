export const initialState = {
  data: [],
  isLoading: false,
  error: null,
  status: "initialized",
};

export const status = {
  initialized: "initialized",
  pending: "pending",
  success: "success",
  rejected: "rejected",
};

export const categorySalaryOption = [
  { value: "salary", label: "salary" },
  { value: "bonus", label: "bonus" },
  { value: "other", label: "other" },
];

export const categoryExpenseOption = [
  { value: "home", label: "home" },
  { value: "credits", label: "credits" },
  { value: "car", label: "car" },
  { value: "education", label: "education" },
  { value: "other", label: "other" },
];
