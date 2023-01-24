import { LocalStorageAdapter } from "./local-storage-adapter";

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter();

describe("LocalStorageAdapter", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("Should call localStorage with correct values", async () => {
    const sut = makeSut();
    const key = "key";
    const value = "values";
    await sut.set(key, value);
    expect(localStorage.getItem(key)).toBe(value);
  });
});
