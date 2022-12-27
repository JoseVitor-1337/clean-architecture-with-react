import React from "react";
import { render, screen } from "@testing-library/react";

import { Login } from "./login";

describe("Login Component", () => {
  test("Should not render spinner and error on initial state", () => {
    render(<Login />);
    const errorWrap = screen.getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(0);
  });

  test("Should submit button is disable on initial state", () => {
    render(<Login />);
    const submitButton = screen.getByTestId("submit");
    expect(submitButton).toBeDisabled();
  });
});
