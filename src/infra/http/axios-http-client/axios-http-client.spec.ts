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
  const mockedAxiosResult = {
    data: { randow: "" },
    status: 1,
  };
  mockedAxios.post.mockResolvedValue(mockedAxiosResult);
  const postRequest = mockPostRequest();

  test("Should call axios with correct URL and verb", async () => {
    const sut = makeSut();
    await sut.post(postRequest);
    expect(mockedAxios.post).toHaveBeenCalledWith(postRequest.url, postRequest.body);
  });

  test("Should return the correct statusCode and body", async () => {
    const sut = makeSut();
    const httpResponse = await sut.post(postRequest);
    expect(httpResponse).toEqual({ statusCode: mockedAxiosResult.status, body: mockedAxiosResult.data });
  });
});
