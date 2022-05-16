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
  login: string,
  token: string,
  date: string,
  name: string,
  userId: string
}

export interface Token { token: string }

export interface User {
  id: string,
  name: string,
  login: string
}

export interface IBoardDescription {
  title: string,
  description: string
}

export interface IBoardData {
  id: string,
  title: string,
  "description": string,
  columns?: IColumnsData[],
}

export interface IBoardUpdate {
  title: string,
  description: string,
  columns?: IColumnsData[],
}

export interface IColumnsData {
  id: string,
  title: string,
  order: number,
  tasks?: ITaskData[],
}

export interface IColumnsRequestData {
  title: string,
  order: number,
}

export interface INewTaskData {
  title: string,
  done: boolean,
  order: number,
  description: string,
  userId: string,
}

export interface IUpdateTaskData {
  title: string,
  done: boolean,
  order: number,
  description: string,
  userId: string,
  boardId: string,
  columnId: string,
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
