import { AccountModel } from "@domain/models/account-model";
import { AuthenticationParams } from "@domain/use-cases/authentication";

export const mockAuthentication = (): AuthenticationParams => {
  return {
    email: "fakeemail@gmail.com",
    password: "fakepassword",
  };
};

export const mockAccountModel = (): AccountModel => {
  return {
    accessToken: "IAHSDDOIJI1O23JIOAJSIODJOI21J3OI1J2OI3JOIJOISADFJIOAJSIIDOO1",
  };
};
