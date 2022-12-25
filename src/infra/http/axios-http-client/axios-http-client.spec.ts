import { AxiosHttpClient } from "./axios-http-client";
import axios from "axios";
import { HttpPostParams } from "@data/protocols/http";

jest.mock("axios");

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};

const mockPostRequest = (): HttpPostParams<any> => {
  return { url: "anyUrl", body: { emaiL: "", password: "" } };
};

describe("AxiosHttpClient", () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  test("Should call axios with correct URL and verb", async () => {
    const postRequest = mockPostRequest();
    const sut = makeSut();
    await sut.post(postRequest);
    expect(mockedAxios.post).toHaveBeenCalledWith(postRequest.url, postRequest.body);
  });
});
