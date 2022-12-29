import React from "react";

import Styles from "./spinner.scss";

type Props = React.HTMLAttributes<HTMLElement>;

export const Spinner: React.FC<Props> = ({ className, ...rest }) => {
  return (
    <div className={[Styles.spinner, className].join(" ")} data-testid="spinner" {...rest}>
      <div /> <div /> <div /> <div />
    </div>
  );
};
