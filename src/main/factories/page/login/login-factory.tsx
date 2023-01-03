import React, { ReactElement } from "react";
import { Login } from "@presentation/pages";
import { RemoteAuthentication } from "@data/use-cases/authentication/remove-authentication";
import { AxiosHttpClient } from "@infra/http/axios-http-client/axios-http-client";
import { ValidationBuilder, ValidationComposite } from "@presentation/validation/validators";

export const makeLogin = (): ReactElement => {
  const url = "http://fordevs.herokuapp.com/api/login";
  const axiosHttpClient = new AxiosHttpClient();
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient);

  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field("email").required().email().build(),
    ...ValidationBuilder.field("password").required().min(5).build(),
  ]);

  return <Login authentication={remoteAuthentication} validation={validationComposite} />;
};
