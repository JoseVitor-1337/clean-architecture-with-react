import React, { useState } from "react";
import Styles from "./login.scss";

import { Input, Footer, FormStatus, LoginHeader } from "@presentation/components";

type InputErrors = {
  email: string;
  password: string;
};

export const Login: React.FC = () => {
  const [isLoading] = useState<boolean>(false);
  const [errorMessage] = useState<string | undefined>();
  const [inputErrors] = useState<InputErrors>({
    email: "Campo obrigatório",
    password: "Campo obrigatório",
  });

  return (
    <div className={Styles.login}>
      <LoginHeader />

      <form className={Styles.form}>
        <h2>Login</h2>

        <Input type="email" placeholder="Digite seu email" title={inputErrors.email} />
        <Input type="password" placeholder="Digite sua senha" title={inputErrors.password} />

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
