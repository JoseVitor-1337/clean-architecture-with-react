import { IHttpPostClient } from "data/protocols/http/http-post-clien";

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: IHttpPostClient
  ) {}

  async auth(): Promise<void> {
    await this.httpPostClient.post(this.url);
  }
}
