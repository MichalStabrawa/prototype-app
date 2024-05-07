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
