import { render } from "@testing-library/react";
import "matchmedia-polyfill";
import { Provider } from "react-redux";
import HeaderComponent from "./HeaderComponent";
import configureStore from "redux-mock-store";

const mockStore = configureStore();
const store = mockStore({ currency: { data: null, status: "idle" } });

describe("Header render", () => {
  test("Header render", () => {
    render(
      <Provider store={store}>
        <HeaderComponent />
      </Provider>
    );
  });
});
