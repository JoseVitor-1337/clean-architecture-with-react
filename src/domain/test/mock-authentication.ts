import { AuthenticationParams } from "@domain/use-cases/authentication";

export const mockAuthentication = (): AuthenticationParams => {
  return {
    email: "fakeemail@gmail.com",
    password: "fakepassword",
  };
};
