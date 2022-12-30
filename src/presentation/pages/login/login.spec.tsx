import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AuthenticationSpy, ValidationSpy } from "@presentation/test";
import { Login } from "./login";

import "jest-localstorage-mock";

type MakeLoginFactoryReturn = {
  validationSpy: ValidationSpy;
  authenticationSpy: AuthenticationSpy;
};

type LoginProps = {
  validation: ValidationSpy;
  authentication: AuthenticationSpy;
};

const setupRouterInTest = (loginProps: LoginProps) => {
  render(
    <MemoryRouter initialEntries={["/"]} initialIndex={0}>
      <Routes>
        <Route path="/" element={<Login {...loginProps} />} />
        <Route path="/signup" element={<div data-testid="signup-page" />} />
        <Route path="/home" element={<div data-testid="home-page" />} />
      </Routes>
    </MemoryRouter>
  );
};

const makeLoginFactory = (errorMessage = ""): MakeLoginFactoryReturn => {
  const validationSpy = new ValidationSpy();
  const authenticationSpy = new AuthenticationSpy();
  validationSpy.errorMessage = errorMessage;
  setupRouterInTest({ validation: validationSpy, authentication: authenticationSpy });

  return { validationSpy, authenticationSpy };
};

const populateEmailField = (email = ""): void => {
  const emailInput = screen.getByTestId("login-email");
  fireEvent.input(emailInput, { target: { value: email } });
};

const populatePasswordField = (password = ""): void => {
  const passwordInput = screen.getByTestId("login-password");
  fireEvent.input(passwordInput, { target: { value: password } });
};

const simulataFormStatusForField = (fieldName: string, validationError?: string): void => {
  const fieldStatus = screen.getByTestId(fieldName);
  expect(fieldStatus.title).toBe(validationError || "Tudo certo!");
  expect(fieldStatus).toHaveTextContent(validationError ? "🔴" : "🟢");
};

const simulateValidSubmit = (email = "", password = ""): void => {
  populateEmailField(email);
  populatePasswordField(password);
  const submitButton = screen.getByTestId("submit");
  fireEvent.submit(submitButton);
};

describe("Login Component", () => {
  afterEach(cleanup);
  beforeEach(() => {
    localStorage.clear();
  });

  test("Should not render spinner and error on initial state", () => {
    makeLoginFactory();
    const errorWrap = screen.getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(0);
  });

  test("Should submit button is disable on initial state", () => {
    makeLoginFactory("Campo obrigatório");
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
    populateEmailField("anyEmail");
    expect(validationSpy.fieldName).toEqual("email");
    expect(validationSpy.fieldValue).toEqual("anyEmail");
  });

  test("Should call Validation with correct password", () => {
    const { validationSpy } = makeLoginFactory();
    populatePasswordField("anyPassword");
    expect(validationSpy.fieldName).toEqual("password");
    expect(validationSpy.fieldValue).toEqual("anyPassword");
  });

  test("Should show email error on title if validaion fails", () => {
    const { validationSpy } = makeLoginFactory();
    validationSpy.errorMessage = "anyError";
    populateEmailField("anyEmail");
    simulataFormStatusForField("login-email-status", validationSpy.errorMessage);
  });

  test("Should show password error on title if validaion fails", () => {
    const { validationSpy } = makeLoginFactory();
    validationSpy.errorMessage = "anyError";
    populatePasswordField("anyPassword");
    simulataFormStatusForField("login-password-status", validationSpy.errorMessage);
  });

  test("Should show valid email state if Validation succeeds", () => {
    makeLoginFactory();
    populateEmailField("anyEmail");
    simulataFormStatusForField("login-email-status");
  });

  test("Should show valid password state if Validation succeeds", () => {
    makeLoginFactory();
    populatePasswordField("anyPassword");
    simulataFormStatusForField("login-password-status");
  });

  test("Should enable submit button if form is valid", () => {
    makeLoginFactory();
    const submitButton = screen.getByTestId("submit");
    populateEmailField("anyEmail");
    populatePasswordField("anyPassword");
    expect(submitButton).toBeEnabled();
  });

  test("Should show Spinner after onSubmit", async () => {
    makeLoginFactory();
    simulateValidSubmit();
    await waitFor(() => screen.queryByTestId("login-form"));
    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();
  });

  test("Should call Authentication with correct values", async () => {
    const { authenticationSpy } = makeLoginFactory();
    const email = "anyEmail";
    const password = "anyPassword";
    simulateValidSubmit(email, password);
    await waitFor(() => screen.queryByTestId("login-form"));
    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });

  test("Should call Authentication only once", async () => {
    const { authenticationSpy } = makeLoginFactory();
    simulateValidSubmit();
    simulateValidSubmit();
    await waitFor(() => screen.queryByTestId("login-form"));
    expect(authenticationSpy.callsCount).toBe(1);
  });

  test("Should not call Authentication if form is valid", () => {
    const { authenticationSpy } = makeLoginFactory("Error");
    populateEmailField("anyEmail");
    const form = screen.getByTestId("login-form");
    fireEvent.submit(form);
    expect(authenticationSpy.callsCount).toBe(0);
  });

  test("Should add accessToken to localStorage on success", async () => {
    const { authenticationSpy } = makeLoginFactory();
    simulateValidSubmit();
    await waitFor(() => screen.queryByTestId("login-form"));
    expect(localStorage.setItem).toHaveBeenCalledWith("accessToken", authenticationSpy.account.accessToken);
  });

  test("Should go to SignUp page", () => {
    makeLoginFactory();
    const link = screen.getByTestId("link-to-signup");
    fireEvent.click(link);
    const signUpPage = screen.queryByTestId("signup-page");
    expect(signUpPage).toBeInTheDocument();
  });

  test.skip("Should go to Home page if form was submitted correctly", async () => {
    makeLoginFactory();
    simulateValidSubmit();
    await waitFor(() => screen.queryByTestId("login-form"));
    const homePage = screen.queryByTestId("home-page");
    expect(homePage).toBeInTheDocument();
  });
});
