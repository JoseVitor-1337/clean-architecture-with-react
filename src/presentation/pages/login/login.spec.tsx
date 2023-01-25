import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AuthenticationSpy, ValidationSpy, SaveAccessTokenMock } from "@presentation/test";
import { Login } from "@presentation/pages/login/login";
import { InvalidCredentialsError } from "@domain/erros";

type SutTypes = {
  validationSpy: ValidationSpy;
  authenticationSpy: AuthenticationSpy;
  saveAccessTokenMock: SaveAccessTokenMock;
};

type LoginProps = {
  validation: ValidationSpy;
  authentication: AuthenticationSpy;
  saveAccessToken: SaveAccessTokenMock;
};

const setupRouterInTest = async (loginProps: LoginProps) => {
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

const makeLoginFactory = async (errorMessage = ""): Promise<SutTypes> => {
  const saveAccessTokenMock = new SaveAccessTokenMock();
  const validationSpy = new ValidationSpy();
  const authenticationSpy = new AuthenticationSpy();
  validationSpy.errorMessage = errorMessage;

  await setupRouterInTest({ validation: validationSpy, authentication: authenticationSpy, saveAccessToken: saveAccessTokenMock });

  return { validationSpy, authenticationSpy, saveAccessTokenMock };
};

const populateEmailField = (email = ""): void => {
  const emailInput = screen.getByTestId("login-email");
  fireEvent.input(emailInput, { target: { value: email } });
};

const populatePasswordField = (password = ""): void => {
  const passwordInput = screen.getByTestId("login-password");
  fireEvent.input(passwordInput, { target: { value: password } });
};

const testFormStatusForField = (fieldName: string, validationError?: string): void => {
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

const testElementIsInTheDocument = (dataTestId: string) => {
  const element = screen.queryByTestId(dataTestId);
  expect(element).toBeInTheDocument();
};

const testButtonIsEnabled = (dataTestId: string, toBeDisabled: boolean) => {
  const button = screen.queryByTestId(dataTestId);
  if (toBeDisabled) {
    expect(button).toBeDisabled();
  } else {
    expect(button).toBeEnabled();
  }
};

describe("Login Component", () => {
  afterEach(cleanup);

  test("Should not render spinner and error on initial state", async () => {
    await makeLoginFactory();
    const errorWrap = screen.getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(0);
  });

  test("Should submit button is disable on initial state", async () => {
    await makeLoginFactory("Campo obrigatório");
    testButtonIsEnabled("submit", true);
  });

  test("Should email and password inputs start with error spans on initial state", async () => {
    const { validationSpy } = await makeLoginFactory("Campo obrigatório");
    const inputErrorSpans = screen.queryAllByTitle(validationSpy.errorMessage);
    expect(inputErrorSpans.length).toBe(2);
    inputErrorSpans.forEach((errorSpan) => expect(errorSpan).toHaveTextContent("🔴"));
  });

  test("Should call Validation with correct email", async () => {
    const { validationSpy } = await makeLoginFactory();
    populateEmailField("anyEmail");
    expect(validationSpy.fieldName).toEqual("email");
    expect(validationSpy.fieldValue).toEqual("anyEmail");
  });

  test("Should call Validation with correct password", async () => {
    const { validationSpy } = await makeLoginFactory();
    populatePasswordField("anyPassword");
    expect(validationSpy.fieldName).toEqual("password");
    expect(validationSpy.fieldValue).toEqual("anyPassword");
  });

  test("Should show email error on title if validaion fails", async () => {
    const { validationSpy } = await makeLoginFactory();
    validationSpy.errorMessage = "anyError";
    populateEmailField("anyEmail");
    testFormStatusForField("login-email-status", validationSpy.errorMessage);
  });

  test("Should show password error on title if validaion fails", async () => {
    const { validationSpy } = await makeLoginFactory();
    validationSpy.errorMessage = "anyError";
    populatePasswordField("anyPassword");
    testFormStatusForField("login-password-status", validationSpy.errorMessage);
  });

  test("Should show valid email state if Validation succeeds", async () => {
    await makeLoginFactory();
    populateEmailField("anyEmail");
    testFormStatusForField("login-email-status");
  });

  test("Should show valid password state if Validation succeeds", async () => {
    await makeLoginFactory();
    populatePasswordField("anyPassword");
    testFormStatusForField("login-password-status");
  });

  test("Should enable submit button if form is valid", async () => {
    await makeLoginFactory();
    populateEmailField("anyEmail");
    populatePasswordField("anyPassword");
    testButtonIsEnabled("submit", false);
  });

  test("Should show Spinner after onSubmit", async () => {
    await makeLoginFactory();
    simulateValidSubmit();
    await waitFor(() => screen.queryByTestId("login-form"));
    testElementIsInTheDocument("spinner");
  });

  test("Should call Authentication with correct values", async () => {
    const { authenticationSpy } = await makeLoginFactory();
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
    const { authenticationSpy } = await makeLoginFactory();
    simulateValidSubmit();
    simulateValidSubmit();
    await waitFor(() => screen.queryByTestId("login-form"));
    expect(authenticationSpy.callsCount).toBe(1);
  });

  test("Should not call Authentication if form is valid", async () => {
    const { authenticationSpy } = await makeLoginFactory("Error");
    populateEmailField("anyEmail");
    const form = screen.getByTestId("login-form");
    fireEvent.submit(form);
    expect(authenticationSpy.callsCount).toBe(0);
  });

  test("Should call SaveAccessToken on success", async () => {
    const { authenticationSpy, saveAccessTokenMock } = await makeLoginFactory();
    simulateValidSubmit();
    await waitFor(() => screen.queryByTestId("login-form"));
    expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken);
  });

  test("Should present error if SaveAccessToken fails", async () => {
    const { saveAccessTokenMock } = await makeLoginFactory();
    const error = new InvalidCredentialsError();
    jest.spyOn(saveAccessTokenMock, "save").mockReturnValueOnce(Promise.reject(error));
    simulateValidSubmit();
    await waitFor(() => screen.queryByTestId("login-form"));
    testElementIsInTheDocument("error-wrap");
  });

  test("Should call SaveAccessToken on success", async () => {
    const { authenticationSpy, saveAccessTokenMock } = await makeLoginFactory();
    simulateValidSubmit();
    await waitFor(() => screen.queryByTestId("login-form"));
    expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken);
  });

  test("Should go to SignUp page", async () => {
    await makeLoginFactory();
    const link = screen.getByTestId("link-to-signup");
    fireEvent.click(link);
    testElementIsInTheDocument("signup-page");
  });

  test.skip("Should go to Home page if form was submitted correctly", async () => {
    await makeLoginFactory();
    simulateValidSubmit();
    await waitFor(() => screen.queryByTestId("login-form"));
    testElementIsInTheDocument("home-page");
  });
});
