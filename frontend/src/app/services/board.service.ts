import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private env: string;

  constructor(private _http: HttpClient, private _router: Router) {
    this.env = environment.APP_URL; //aca estamos diciendo que env es la url del back queda http://localhost:3001/api/
  }

  saveTask(board: any) {
    return this._http.post<any>(this.env + 'board/saveTask', board); //guardamos lo que ingreso el usuario en el json de board
  }

  listTask() {
    return this._http.get<any>(this.env + 'board/listTask');
  }

  updateTask(board: any) {
    return this._http.put<any>(this.env + 'board/updateTask', board);
  }

  deleteTask(board: any) {
    return this._http.delete<any>(this.env + 'board/deleteTask/' + board._id); //para poder eliminar se concatena el board id porque con el json no se podria borrar
  }

  saveTaskImg(board: any) {
    return this._http.post<any>(this.env + 'board/saveTaskImg', board); //guardamos lo que ingreso el usuario en el json de board
  }
}
