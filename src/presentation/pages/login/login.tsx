import React, { useEffect, useState } from "react";

import { Validation } from "@presentation/protocols/validation";
import { Input, Footer, FormStatus, LoginHeader } from "@presentation/components";

import Styles from "./login.scss";

type InputErrors = {
  email: string;
  password: string;
};

type Props = {
  validation: Validation;
};

export const Login: React.FC<Props> = ({ validation }) => {
  const [isLoading] = useState<boolean>(false);
  const [errorMessage] = useState<string | undefined>();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [inputErrors] = useState<InputErrors>({
    email: "Campo obrigatório",
    password: "Campo obrigatório",
  });

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setInputs({ ...inputs, [name]: value });
  }

  useEffect(() => {
    validation.validate({ email: inputs.email });
  }, [inputs.email]);

  useEffect(() => {
    validation.validate({ password: inputs.password });
  }, [inputs.password]);

  return (
    <div className={Styles.login}>
      <LoginHeader />

      <form className={Styles.form}>
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

        <button data-testid="submit" disabled className={Styles.submit} type="submit">
          Entrar
        </button>
        <span className={Styles.link}>Criar conta</span>
        <FormStatus isLoading={isLoading} errorMessage={errorMessage} />
      </form>

      <Footer />
    </div>
  );
};
