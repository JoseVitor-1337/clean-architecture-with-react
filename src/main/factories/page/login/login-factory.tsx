import React, { ReactElement } from "react";

import { Login } from "@presentation/pages";
import { makeRemoteAuthentication } from "@main/factories/use-cases/authentication/remote-authentication-factory";
import { makeLocalSaveAccessToken } from "@main/factories/use-cases/save-access-token/local-save-access-token-factory";
import { makeLoginValidation } from "./login-validation-factory";

export const makeLogin = (): ReactElement => {
  return <Login authentication={makeRemoteAuthentication()} validation={makeLoginValidation()} saveAccessToken={makeLocalSaveAccessToken()} />;
};
