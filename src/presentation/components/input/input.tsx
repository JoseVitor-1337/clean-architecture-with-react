import React from "react";

import Styles from "./input.scss";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<Props> = (props) => {
  return (
    <div className={Styles.inputWrap}>
      <input {...props} />
      <span className={Styles.inputStatus}>🔴</span>
    </div>
  );
};
