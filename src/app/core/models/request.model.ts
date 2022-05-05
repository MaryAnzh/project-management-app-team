export interface IUseRegistrationData {
  name: string,
  login: string,
  password: string
}

export interface IUserLoginData {
  login: string,
  password: string
}

export interface IResAuthLogin {
  name: string,
  token: string
}

export interface Token { token: string }

export interface User {
  id: string,
  name: string,
  login: string
}
