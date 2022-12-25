/* eslint-disable indent */
import { HttpStatusCode } from "@data/protocols/http/http-response";
import { InvalidCredentialsError } from "@domain/erros/invalid-credentials-error";
import { UnexpectedError } from "@domain/erros/unexpected-error";
import { AccountModel } from "@domain/models/account-model";
import { IHttpPostClient } from "@data/protocols/http/http-post-client";
import { AuthenticationParams } from "@domain/use-cases/authentication";

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: IHttpPostClient<
      AuthenticationParams,
      AccountModel
    >
  ) {}

  async auth(params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        break;
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      default:
        throw new UnexpectedError();
    }
  }
}
