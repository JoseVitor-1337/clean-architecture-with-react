import React from "react";

import Styles from "./input.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
}

export const Input: React.FC<Props> = ({ title, onChange, ...props }) => {
  const testId = props["data-testid"];

  return (
    <div className={Styles.inputWrap}>
      <input onChange={onChange} data-testid={testId} {...props} />
      <span title={title} data-testid={`${testId}-status`} className={Styles.inputStatus}>
        🔴
      </span>
    </div>
  );
};
