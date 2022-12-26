import React from "react";
import Styles from "./login.scss";

import { Spinner } from "@presentation/components/spinner/spinner";
import LoginHeader from "@presentation/components/login-header/login-header";
import Footer from "@presentation/components/footer/footer";

export const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <LoginHeader />

      <form className={Styles.form}>
        <h2>Login</h2>
        <div className={Styles.inputWrap}>
          <input type="email" name="email" id="email" placeholder="Digite seu email" />
          <span className={Styles.inputStatus}>🔴</span>
        </div>
        <div className={Styles.inputWrap}>
          <input type="password" name="password" id="password" placeholder="Digite seu email" />
          <span className={Styles.inputStatus}>🔴</span>
        </div>
        <button className={Styles.submit} type="submit">
          Entrar
        </button>
        <span className={Styles.link}>Criar conta</span>

        <div className={Styles.errorWrap}>
          <Spinner className={Styles.spinner} />
          <span className={Styles.error}>Error</span>
        </div>
      </form>

      <Footer />
    </div>
  );
};
