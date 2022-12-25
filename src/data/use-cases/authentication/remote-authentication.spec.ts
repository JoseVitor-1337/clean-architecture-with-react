import { HttpStatusCode } from "@data/protocols/http/http-response";
import { HttpPostClientSpy } from "@data/tests/mock-http-client";
import { InvalidCredentialsError } from "@domain/erros/invalid-credentials-error";
import { UnexpectedError } from "@domain/erros/unexpected-error";
import { AccountModel } from "@domain/models/account-model";
import { mockAuthentication } from "@domain/test/mock-authentication";
import { AuthenticationParams } from "@domain/use-cases/authentication";
import { RemoteAuthentication } from "./remove-authentication";

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>;
};

const makeSut = (url = "another_url"): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AuthenticationParams,
    AccountModel
  >();
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

  test("Should throw InvalidCredentialsError if HttpPostClient returns 401 statusCode", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
    };
    const promise = sut.auth(authenticationParams);
    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  test("Should throw UnexpectedError if HttpPostClient returns 400 statusCode", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = sut.auth(authenticationParams);
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("Should throw UnexpectedError if HttpPostClient returns 500 statusCode", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.auth(authenticationParams);
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("Should throw UnexpectedError if HttpPostClient returns 494 statusCode", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.auth(authenticationParams);
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
