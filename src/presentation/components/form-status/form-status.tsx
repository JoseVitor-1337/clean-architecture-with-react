import React from "react";

import { Spinner } from "@presentation/components/spinner/spinner";

import Styles from "./form-status.scss";

export const FormStatus: React.FC = () => {
  return (
    <div className={Styles.errorWrap}>
      <Spinner className={Styles.spinner} />
      <span className={Styles.error}>Error</span>
    </div>
  );
};
