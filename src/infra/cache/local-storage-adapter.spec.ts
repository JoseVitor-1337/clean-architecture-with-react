import { LocalStorageAdapter } from "./local-storage-adapter";

describe("LocalStorageAdapter", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("Should call localStorage with correct values", async () => {
    const sut = new LocalStorageAdapter();
    const key = "key";
    const value = "values";
    await sut.set(key, value);
    expect(localStorage.getItem(key)).toBe(value);
  });
});
