import { AxiosHttpClient } from "@infra/http/axios-http-client/axios-http-client";

export const makeAxiosHtppClient = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};
