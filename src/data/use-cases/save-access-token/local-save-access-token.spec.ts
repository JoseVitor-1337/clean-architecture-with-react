import { SetStorageSpy } from "@data/tests/mock-storage";
import { LocalSaveAccessToken } from "./local-save-access-token";

describe("LocalSaveAccessToken", () => {
  test("Should call setStorage with correct value", async () => {
    const setStorage = new SetStorageSpy();
    const accessToken = "TOKEN";
    const sut = new LocalSaveAccessToken(setStorage);
    await sut.save(accessToken);
    expect(setStorage.key).toBe("accessToken");
    expect(setStorage.value).toBe(accessToken);
  });
});
