import { HttpPostParams } from "@data/protocols/http";

export const mockPostRequest = (): HttpPostParams<any> => {
  return { url: "", body: {} };
};
