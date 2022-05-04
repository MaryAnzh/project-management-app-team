export interface IUserData {
  name?: string,
  login: string,
  password: string
}

export interface Token { token: string }

export interface User {
  id: string,
  name: string,
  login: string
}
