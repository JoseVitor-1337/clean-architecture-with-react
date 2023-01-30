import { LocalSaveAccessToken } from "@data/use-cases/save-access-token/local-save-access-token";
import { SaveAccessToken } from "@domain/use-cases";
import { makeLocalStorageAdapter } from "@main/factories/cache/local-storage-adapter-factory";

export const makeLocalSaveAccessToken = (): SaveAccessToken => {
  const localStorageAdapter = makeLocalStorageAdapter();
  return new LocalSaveAccessToken(localStorageAdapter);
};
