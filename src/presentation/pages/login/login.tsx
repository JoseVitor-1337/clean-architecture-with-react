import React from "react";
import Styles from "./login.scss";

import { Spinner } from "@presentation/components/spinner/spinner";
import { Logo } from "@presentation/components/logo/logo";

export const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <header className={Styles.header}>
        <Logo />
        <h1>4Dev - Enquetes para programadores</h1>
      </header>

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

      <footer className={Styles.footer}></footer>
    </div>
  );
};
