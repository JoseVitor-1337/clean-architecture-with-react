import { IHttpPostClient } from "data/protocols/http/http-post-clien";
import { RemoteAuthentication } from "./remove-authentication";

class HttpPostClientSpy implements IHttpPostClient {
  url?: string;

  async post(url: string): Promise<void> {
    this.url = url;
  }
}

describe("RemoveAuthentication", () => {
  test("Should call HttpPostClient with correct URL", async () => {
    const url = "any URl";
    const httpPostClientSpy = new HttpPostClientSpy();
    const sut = new RemoteAuthentication(url, httpPostClientSpy);
    await sut.auth();
    expect(httpPostClientSpy.url).toBe(url);
  });
});
