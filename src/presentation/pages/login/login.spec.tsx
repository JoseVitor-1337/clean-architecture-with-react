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

  test("Should email and password inputs start with error spans on initial state", () => {
    render(<Login />);
    const inputErrorSpans = screen.queryAllByTitle("Campo obrigatório");
    expect(inputErrorSpans.length).toBe(2);
    inputErrorSpans.forEach((errorSpan) => expect(errorSpan).toHaveTextContent("🔴"));
  });
});
