import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import { Validation } from "@presentation/protocols/validation";

import { Login } from "./login";

class ValidationSpy implements Validation {
  errorMessage: string;
  input: object;

  validate(input: object): string {
    this.input = input;
    return this.errorMessage;
  }
}

type MakeLoginFactoryReturn = {
  validationSpy: ValidationSpy;
};

const makeLoginFactory = (): MakeLoginFactoryReturn => {
  const validationSpy = new ValidationSpy();
  render(<Login validation={validationSpy} />);

  return { validationSpy };
};

describe("Login Component", () => {
  afterEach(cleanup);

  test("Should not render spinner and error on initial state", () => {
    makeLoginFactory();
    const errorWrap = screen.getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(0);
  });

  test("Should submit button is disable on initial state", () => {
    makeLoginFactory();
    const submitButton = screen.getByTestId("submit");
    expect(submitButton).toBeDisabled();
  });

  test("Should email and password inputs start with error spans on initial state", () => {
    makeLoginFactory();
    const inputErrorSpans = screen.queryAllByTitle("Campo obrigatório");
    expect(inputErrorSpans.length).toBe(2);
    inputErrorSpans.forEach((errorSpan) => expect(errorSpan).toHaveTextContent("🔴"));
  });

  test("Should call Validation with correct email", () => {
    const { validationSpy } = makeLoginFactory();
    const emailInput = screen.getByTestId("login-email");
    fireEvent.input(emailInput, { target: { value: "anyEmail" } });
    expect(validationSpy.input).toEqual({ email: "anyEmail" });
  });

  test("Should call Validation with correct password", () => {
    const { validationSpy } = makeLoginFactory();
    const passwordInput = screen.getByTestId("login-password");
    fireEvent.input(passwordInput, { target: { value: "anyPassword" } });
    expect(validationSpy.input).toEqual({ password: "anyPassword" });
  });
});
