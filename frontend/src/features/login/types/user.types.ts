export interface UserCredentials {
  username?: string;
  email: string;
  password: string;
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  token: string;
}
