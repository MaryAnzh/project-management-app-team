export interface IUserData {
  name?: string,
  login: string,
  password: string
}

export interface IResAuthLogin {
  login: string,
  token: string
}

export interface Token { token: string }

export interface User {
  id: string,
  name: string,
  login: string
}
