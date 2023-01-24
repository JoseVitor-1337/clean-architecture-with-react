import { SetStorageMock } from "@data/tests/mock-storage";
import { LocalSaveAccessToken } from "./local-save-access-token";

type SutTypes = {
  sut: LocalSaveAccessToken;
  setStorageMock: SetStorageMock;
};

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock();
  const sut = new LocalSaveAccessToken(setStorageMock);

  return {
    sut,
    setStorageMock,
  };
};

describe("LocalSaveAccessToken", () => {
  test("Should call setStorage with correct value", async () => {
    const accessToken = "TOKEN";
    const { sut, setStorageMock } = makeSut();
    await sut.save(accessToken);
    expect(setStorageMock.key).toBe("accessToken");
    expect(setStorageMock.value).toBe(accessToken);
  });

  test("Should throw if SetStorage throws", async () => {
    const { sut, setStorageMock } = makeSut();
    jest.spyOn(setStorageMock, "set").mockRejectedValueOnce(new Error());
    const promise = sut.save("TOKEN");
    await expect(promise).rejects.toThrow();
  });
});
