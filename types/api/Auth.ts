export interface Tokens {
  userId: number;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export type RefreshedTokens = Omit<Tokens, "refreshToken">;
