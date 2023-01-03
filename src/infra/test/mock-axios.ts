import axios from "axios";

export const mockHttpResponse = (): any => {
  return {
    data: {},
    status: 200,
  };
};

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.post.mockResolvedValue(mockHttpResponse);
  return mockedAxios;
};
