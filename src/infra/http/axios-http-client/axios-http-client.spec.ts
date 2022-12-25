import { AxiosHttpClient } from "./axios-http-client";
import { mockAxios } from "@infra/test";
import { mockPostRequest } from "@data/tests";

import axios from "axios";

jest.mock("axios");

type SutTypes = {
  sut: AxiosHttpClient;
  mockedAxios: jest.Mocked<typeof axios>;
};

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();

  return {
    sut,
    mockedAxios,
  };
};

describe("AxiosHttpClient", () => {
  const postRequest = mockPostRequest();

  test("Should call axios with correct URL and verb", async () => {
    const { mockedAxios, sut } = makeSut();
    await sut.post(postRequest);
    expect(mockedAxios.post).toHaveBeenCalledWith(postRequest.url, postRequest.body);
  });

  test("Should return the correct statusCode and body", () => {
    const { mockedAxios, sut } = makeSut();
    const promise = sut.post(postRequest);
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
  });
});
