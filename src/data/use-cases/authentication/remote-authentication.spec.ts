import { mockAuthentication } from "../../../domain/test/mock-authentication";
import { HttpPostClientSpy } from "../../tests/mock-http-client";
import { RemoteAuthentication } from "./remove-authentication";

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy;
};

const makeSut = (url = "another_url"): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);

  return {
    sut,
    httpPostClientSpy,
  };
};

describe("RemoveAuthentication", () => {
  const authenticationParams = mockAuthentication();

  test("Should call HttpPostClient with correct URL", async () => {
    const url = "other url";
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.auth(authenticationParams);
    expect(httpPostClientSpy.url).toBe(url);
  });

  test("Should call HttpPostClient with correct body", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    await sut.auth(authenticationParams);
    expect(httpPostClientSpy.body).toEqual(authenticationParams);
  });
});
