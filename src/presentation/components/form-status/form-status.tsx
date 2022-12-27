import React from "react";

import { Spinner } from "@presentation/components/spinner/spinner";

import Styles from "./form-status.scss";

type Props = {
  isLoading: boolean;
  errorMessage?: string;
  title?: string;
};

export const FormStatus: React.FC<Props> = ({ isLoading, errorMessage, title = "Campo obrigatório" }) => {
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {errorMessage && (
        <span title={title} className={Styles.error}>
          {errorMessage}
        </span>
      )}
    </div>
  );
};
