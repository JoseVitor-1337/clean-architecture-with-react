import { AxiosHttpClient } from "./axios-http-client";
import axios from "axios";

jest.mock("axios");

describe("AxiosHttpClient", () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  test("Should call axios with correct URL", async () => {
    const url = "anyUrl";
    const sut = new AxiosHttpClient();
    await sut.post({ url });
    expect(mockedAxios).toHaveBeenCalledWith(url);
  });
});
