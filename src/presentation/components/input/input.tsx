import React from "react";

import Styles from "./input.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
}

export const Input: React.FC<Props> = ({ title, ...rest }) => {
  function enableInput(event: React.FocusEvent<HTMLInputElement>): void {
    event.target.readOnly = false;
  }

  return (
    <div className={Styles.inputWrap}>
      <input readOnly onFocus={enableInput} {...rest} />
      <span title={title} className={Styles.inputStatus}>
        🔴
      </span>
    </div>
  );
};
