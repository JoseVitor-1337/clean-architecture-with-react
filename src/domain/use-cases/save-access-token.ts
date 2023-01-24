export type AuthenticationParams = {
  email: string;
  password: string;
};

export interface SaveAccessToken {
  save(accessToken: string): Promise<void>;
}
