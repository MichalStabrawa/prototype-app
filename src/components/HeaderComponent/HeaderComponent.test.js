import { render, screen } from "@testing-library/react";
import "matchmedia-polyfill";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from "react-redux"; // Import the Provider
import configureStore from "redux-mock-store"; // You may need to install this package

import HeaderComponent from "./HeaderComponent";
import ResponsiveCarousel from "../Carousel/ResponsiveCarousel/ResponsiveCarousel";

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
