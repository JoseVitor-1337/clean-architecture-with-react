import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Validation } from "@presentation/protocols/validation";
import { Input, Footer, FormStatus, LoginHeader } from "@presentation/components";
import { Authentication, AuthenticationParams } from "@domain/use-cases";

import Styles from "./login.scss";

type Props = {
  validation: Validation;
  authentication: Authentication;
};

export const Login: React.FC<Props> = ({ validation, authentication }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [inputs, setInputs] = useState<AuthenticationParams>({
    email: "",
    password: "",
  });
  const [inputErrors, setInputErrors] = useState<AuthenticationParams>({
    email: "Campo obrigatório",
    password: "Campo obrigatório",
  });

  const isFormInvalid = useMemo(() => {
    return !(!inputErrors.email && !inputErrors.password);
  }, [inputErrors]);

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  }

  const handleValidateInputs = useCallback((field: string, value: string) => {
    setInputErrors((oldInputErrors) => {
      return { ...oldInputErrors, [field]: validation.validate(field, value) };
    });
  }, []);

  async function handleSubmit(event: React.FormEvent): Promise<void> {
    event.preventDefault();

    try {
      if (isLoading || isFormInvalid) return;
      setIsLoading(true);
      const account = await authentication.auth(inputs);
      localStorage.setItem("accessToken", account.accessToken);
      navigate("/signup");
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error.message);
    }
  }

  useEffect(() => {
    handleValidateInputs("email", inputs.email);
  }, [inputs.email]);

  useEffect(() => {
    handleValidateInputs("password", inputs.password);
  }, [inputs.password]);

  return (
    <div className={Styles.login}>
      <LoginHeader />

      <form data-testid="login-form" className={Styles.form} onSubmit={handleSubmit}>
        <h2>Login</h2>

        <Input
          type="email"
          name="email"
          placeholder="Digite seu email"
          data-testid="login-email"
          value={inputs.email}
          onChange={handleOnChange}
          title={inputErrors.email}
        />
        <Input
          type="password"
          name="password"
          placeholder="Digite sua senha"
          data-testid="login-password"
          value={inputs.password}
          onChange={handleOnChange}
          title={inputErrors.password}
        />

        <button data-testid="submit" disabled={isFormInvalid} className={Styles.submit} type="submit">
          Entrar
        </button>
        <Link data-testid="link-to-signup" to="/signup" className={Styles.link}>
          Criar conta
        </Link>
        <FormStatus isLoading={isLoading} errorMessage={errorMessage} />
      </form>

      <Footer />
    </div>
  );
};
