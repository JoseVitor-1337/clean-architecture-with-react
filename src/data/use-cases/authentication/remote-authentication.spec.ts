import { HttpPostClientSpy } from "../../tests/mock-http-client";
import { RemoteAuthentication } from "./remove-authentication";

describe("RemoveAuthentication", () => {
  test("Should call HttpPostClient with correct URL", async () => {
    const url = "any URl";
    const httpPostClientSpy = new HttpPostClientSpy();
    const sut = new RemoteAuthentication(url, httpPostClientSpy);
    await sut.auth();
    expect(httpPostClientSpy.url).toBe(url);
  });
});
