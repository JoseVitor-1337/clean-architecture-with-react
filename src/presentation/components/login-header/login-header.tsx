import React, { memo } from "react";

import { Logo } from "@presentation/components/logo/logo";

import Styles from "./login-header.scss";

const LoginHeader: React.FC = () => {
  return (
    <header className={Styles.header}>
      <Logo />
      <h1>4Dev - Enquetes para programadores</h1>
    </header>
  );
};

export default memo(LoginHeader);
