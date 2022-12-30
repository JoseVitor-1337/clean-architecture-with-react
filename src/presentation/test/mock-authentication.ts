import { AccountModel } from "@domain/models";
import { mockAccountModel } from "@domain/test";
import { Authentication, AuthenticationParams } from "@domain/use-cases";

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel();
  callsCount = 0;
  params: AuthenticationParams;

  auth(params: AuthenticationParams): Promise<AccountModel> {
    this.callsCount++;
    this.params = params;

    try {
      return Promise.resolve(this.account);
    } catch (error) {
      console.log("Error", error);
    }
  }
}
