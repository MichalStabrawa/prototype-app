import {
  kindOfTableActions,
  default as kindOfTableReducer,
} from "./kindOfTableSlice";

describe("kindOfTableSlice reducer", () => {
  it("should return the initial state", () => {
    expect(kindOfTableReducer(undefined, {})).toEqual({ table: "A" });
  });

  it("should handle changeToTableA", () => {
    const prevState = { table: "B" };
    const nextState = kindOfTableReducer(
      prevState,
      kindOfTableActions.changeToTableA()
    );
    expect(nextState).toEqual({ table: "A" });
  });

  it("should handle changeToTableB", () => {
    const prevState = { table: "A" };
    const nextState = kindOfTableReducer(
      prevState,
      kindOfTableActions.changeToTableB()
    );
    expect(nextState).toEqual({ table: "B" });
  });
});
