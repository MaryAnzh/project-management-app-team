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
  date: string
}

export interface Token { token: string }

export interface User {
  id: string,
  name: string,
  login: string
}

export interface IBoardTitle { title: string}

export interface IBoardData {
  id: string,
  title: string,
  columns?: IColumnsData[] | [],
}

export interface IBoardUpdata {
  title: string,
  columns?: IColumnsData[] | [],
}

export interface IColumnsData {
  id: string,
  title: string,
  order: number,
  tasks?: ITaskData[] | [],
}

export interface IColumnsRequestData {
  title: string,
  order: number,
}

export interface ITaskData {
  id: string,
  title: string,
  order: number,
  done: boolean,
  description: string,
  userId: string,
  files?: IFilesData[]
}

export interface IFilesData {
  filename: string,
  fileSize: number,
}
