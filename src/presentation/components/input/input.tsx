import React from "react";

import Styles from "./input.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
}

export const Input: React.FC<Props> = ({ title, onChange, ...rest }) => {
  return (
    <div className={Styles.inputWrap}>
      <input onChange={onChange} {...rest} />
      <span title={title} className={Styles.inputStatus}>
        🔴
      </span>
    </div>
  );
};
