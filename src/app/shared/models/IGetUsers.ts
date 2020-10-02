export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface UserInfo {
    id: number;
    name: string;
    username: string;
    email: string;
    email_verified_at: string;
    role_id: number;
    created_at: string;
    updated_at: string
  }

export interface me{
      headers: {};
      original: UserInfo;
      exception: null;
}

  /*
  export interface LoginResponse {
    token: string;
    user: UserInfo;
  }*/

  export interface TokenInfo{
    access_token: string;
    token_type: string;
    expires_in: number;
  }
  
  export interface LoginResponse {
    message: string;
    token: TokenInfo;
    user: me;
  }

  export interface RegisterResponse {
    message: string;
    token: TokenInfo;
  }

  export interface RegisterUser {
    name: string;
    username: string;
    email: string;
    password: string;
  }
  
  export interface IGetUser {
    id: number;
    name: string;
    username: string;
    email: string;
  }