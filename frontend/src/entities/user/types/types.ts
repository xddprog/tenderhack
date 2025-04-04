export interface IRegistrationRequest {
  password: string;
  email: string;
}

export interface IAuthorizationRequest {
  password: string;
  email: string;
}

export interface ICurrentUser {
  id: number;
  email: string;
}
