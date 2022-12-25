import { AxiosHttpClient } from "./axios-http-client";
import axios from "axios";

jest.mock("axios");

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};

describe("AxiosHttpClient", () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  test("Should call axios with correct URL and verb", async () => {
    const url = "anyUrl";
    const sut = makeSut();
    await sut.post({ url });
    expect(mockedAxios.post).toHaveBeenCalledWith(url);
  });
});
