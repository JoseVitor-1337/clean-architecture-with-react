import React, { useState } from "react";
import Styles from "./login.scss";

import { Input, Footer, FormStatus, LoginHeader } from "@presentation/components";

export const Login: React.FC = () => {
  const [isLoading] = useState<boolean>(false);
  const [errorMessage] = useState<string | undefined>();

  return (
    <div className={Styles.login}>
      <LoginHeader />

      <form className={Styles.form}>
        <h2>Login</h2>

        <Input type="email" name="email" id="email" placeholder="Digite seu email" />
        <Input type="password" name="password" id="password" placeholder="Digite sua senha" />

        <button className={Styles.submit} type="submit">
          Entrar
        </button>
        <span className={Styles.link}>Criar conta</span>
        <FormStatus isLoading={isLoading} errorMessage={errorMessage} />
      </form>

      <Footer />
    </div>
  );
};
