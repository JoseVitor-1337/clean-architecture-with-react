import { RemoteAuthentication } from "@data/use-cases/authentication/remove-authentication";
import { makeAxiosHtppClient } from "@main/factories/http/axios-http-client-factory";
import { Authentication } from "@domain/use-cases";
import { makeApiURL } from "@main/factories/http/api-url-factory";

export const makeRemoteAuthentication = (): Authentication => {
  const url = makeApiURL("/login");
  const axiosHttpClient = makeAxiosHtppClient();
  return new RemoteAuthentication(url, axiosHttpClient);
};
