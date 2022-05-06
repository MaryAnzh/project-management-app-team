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
  token: string,
  date: Date
}

export interface Token { token: string }

export interface User {
  id: string,
  name: string,
  login: string
}

export interface IBoardData {
  id: string,
  title: string,
}

export interface BoardTitle { title: string }

export interface IColumnsData {
  id: string,
  title: string,
  order: number,
}

export interface IColumnsRequestData {
  title: string,
  order: number,
}
