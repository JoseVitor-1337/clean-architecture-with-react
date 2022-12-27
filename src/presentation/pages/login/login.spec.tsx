import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import { ValidationSpy } from "@presentation/test";
import { Login } from "./login";

type MakeLoginFactoryReturn = {
  validationSpy: ValidationSpy;
};

const makeLoginFactory = (errorMessage?: string): MakeLoginFactoryReturn => {
  const validationSpy = new ValidationSpy();
  validationSpy.errorMessage = errorMessage;
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
    const { validationSpy } = makeLoginFactory("Campo obrigatório");
    const inputErrorSpans = screen.queryAllByTitle(validationSpy.errorMessage);
    expect(inputErrorSpans.length).toBe(2);
    inputErrorSpans.forEach((errorSpan) => expect(errorSpan).toHaveTextContent("🔴"));
  });

  test("Should call Validation with correct email", () => {
    const { validationSpy } = makeLoginFactory();
    const emailInput = screen.getByTestId("login-email");
    fireEvent.input(emailInput, { target: { value: "anyEmail" } });
    expect(validationSpy.fieldName).toEqual("email");
    expect(validationSpy.fieldValue).toEqual("anyEmail");
  });

  test("Should call Validation with correct password", () => {
    const { validationSpy } = makeLoginFactory();
    const passwordInput = screen.getByTestId("login-password");
    fireEvent.input(passwordInput, { target: { value: "anyPassword" } });
    expect(validationSpy.fieldName).toEqual("password");
    expect(validationSpy.fieldValue).toEqual("anyPassword");
  });

  test("Should show email error on title if validaion fails", () => {
    const { validationSpy } = makeLoginFactory();
    validationSpy.errorMessage = "anyError";
    const emailInput = screen.getByTestId("login-email");
    fireEvent.input(emailInput, { target: { value: "anyEmail" } });
    const emailStatus = screen.getByTestId("login-email-status");
    expect(emailStatus.title).toBe(validationSpy.errorMessage);
    expect(emailStatus).toHaveTextContent("🔴");
  });

  test("Should show password error on title if validaion fails", () => {
    const { validationSpy } = makeLoginFactory();
    validationSpy.errorMessage = "anyError";
    const passwordInput = screen.getByTestId("login-password");
    fireEvent.input(passwordInput, { target: { value: "anyPassword" } });
    const passwordStatus = screen.getByTestId("login-password-status");
    expect(passwordStatus.title).toBe(validationSpy.errorMessage);
    expect(passwordStatus).toHaveTextContent("🔴");
  });

  test("Should show valid password state if Validation succeeds", () => {
    const { validationSpy } = makeLoginFactory();
    validationSpy.errorMessage = "";
    const passwordInput = screen.getByTestId("login-password");
    fireEvent.input(passwordInput, { target: { value: "anyPassword" } });
    const passwordStatus = screen.getByTestId("login-password-status");
    expect(passwordStatus.title).toBe("Tudo certo!");
    expect(passwordStatus).toHaveTextContent("🟢");
  });
});
