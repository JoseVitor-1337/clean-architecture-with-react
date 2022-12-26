import React from "react";

import Styles from "./input.scss";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<Props> = (props) => {
  function enableInput(event: React.FocusEvent<HTMLInputElement>): void {
    event.target.readOnly = false;
  }

  return (
    <div className={Styles.inputWrap}>
      <input readOnly onFocus={enableInput} {...props} />
      <span className={Styles.inputStatus}>🔴</span>
    </div>
  );
};
