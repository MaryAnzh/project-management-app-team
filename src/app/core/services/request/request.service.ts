import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  IUserLoginData,
  User,
  IUseRegistrationData,
  IBoardData,
  IBoardUpdate,
  IBoardDescription,
  IColumnsData,
  IColumnsRequestData,
  ITaskData,
  INewTaskData,
  IUpdateTaskData
} from '../../models/request.model';

const httpOptions = {
  headers: new HttpHeaders({
    'accept': 'application/json',
    'Content-Type': 'application/json',
  })
};

const httpOptionsNoContent = {
  headers: new HttpHeaders({
    'accept': '*/*',
  })
};

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  createUser(body: IUseRegistrationData): Observable<User> {
    return this.http.post<User>(`/signup`, body, httpOptions);
  }

  authorizeUser(body: IUserLoginData): Observable<any> {
    return this.http.post<any>(`/signin`, body, httpOptions);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`/users`, httpOptions);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`/users/${id}`, httpOptions);
  }

  deletetUser(id: string): Observable<User> {
    return this.http.delete<User>(`/users/${id}`, httpOptionsNoContent);
  }

  updateUser(id: string, body: IUseRegistrationData): Observable<User> {
    return this.http.put<User>(`/users/${id}`, body, httpOptions);
  }

  getBoards(): Observable<IBoardData[]> {
    return this.http.get<IBoardData[]>(`/boards`, httpOptions);
  }

  createBoard(body: IBoardDescription): Observable<IBoardData> {
    return this.http.post<IBoardData>(`/boards`, body, httpOptions);
  }

  getBoard(id: string): Observable<IBoardData> {
    return this.http.get<IBoardData>(`/boards/${id}`, httpOptions);
  }

  deleteBoard(id: string): Observable<IBoardData> {
    return this.http.delete<IBoardData>(`/boards/${id}`, httpOptionsNoContent);
  }

  updateBoard(id: string, body: IBoardUpdate): Observable<IBoardData> {
    return this.http.put<IBoardData>(`/boards/${id}`, body, httpOptions);
  }

  getColumns(boardId: string): Observable<IColumnsData[]> {
    return this.http.get<IColumnsData[]>(`/boards/${boardId}/columns`, httpOptions);
  }

  createColumn(boardId: string, body: IColumnsRequestData): Observable<IColumnsData[]> {
    return this.http.post<IColumnsData[]>(`/boards/${boardId}/columns`, body, httpOptions);
  }

  getColumn(boardId: string, columnId: string): Observable<any> {
    return this.http.post<IColumnsData[]>(`/boards/${boardId}/columns/${columnId}`, httpOptions);
  }

  deleteColumn(boardId: string, columnId: string): Observable<IColumnsData[]> {
    return this.http.delete<IColumnsData[]>(`/boards/${boardId}/columns/${columnId}`, httpOptionsNoContent);
  }

  updateColumn(boardId: string, columnId: string, body: IColumnsRequestData): Observable<any> {
    return this.http.put<IColumnsData[]>(`/boards/${boardId}/columns/${columnId}`, body, httpOptions);
  }

  createTask(boardId: string, columnId: string, body: INewTaskData): Observable<IBoardData> {
    return this.http.post<IBoardData>(`/boards/${boardId}/columns/${columnId}/tasks`, body, httpOptions);
  }

  updateTask(boardId: string, columnId: string, taskId: string, body: IUpdateTaskData): Observable<any> {
    return this.http.put<IColumnsData[]>(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, body, httpOptions);
  }


  deleteTask(boardId: string, columnId: string, taskId: string): Observable<Object> {
    return this.http.delete(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, httpOptionsNoContent);
  }


}
