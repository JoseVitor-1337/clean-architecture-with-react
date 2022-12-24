import { HttpStatusCode } from "@data/protocols/http/http-response";
import { InvalidCredentialsError } from "@domain/erros/invalid-credentials-error";
import { IHttpPostClient } from "data/protocols/http/http-post-client";
import { AuthenticationParams } from "domain/use-cases/authentication";

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: IHttpPostClient
  ) {}

  async auth(params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });

    if (httpResponse.statusCode === HttpStatusCode.unauthorized) {
      throw new InvalidCredentialsError();
    }
  }
}
