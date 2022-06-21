import React from "react";
import { render as rtlrender, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../Redux/Store";
import Button from "./Button";

const render = (component: any) =>
    rtlrender(<Provider store={store}>{component}</Provider>);
    afterEach(cleanup);

describe("Button", () => {
  it("render Button component Without crashing", () => {
      render(<Button/>);
  });
});
