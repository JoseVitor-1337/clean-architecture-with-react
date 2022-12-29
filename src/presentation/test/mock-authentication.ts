import { AccountModel } from "@domain/models";
import { mockAccountModel } from "@domain/test";
import { Authentication, AuthenticationParams } from "@domain/use-cases";

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel();
  params: AuthenticationParams;

  auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params;
    throw Promise.resolve(this.account);
  }
}
