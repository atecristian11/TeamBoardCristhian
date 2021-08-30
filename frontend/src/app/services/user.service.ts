import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private env: string;

  constructor(private _http: HttpClient, private _router: Router) {
    this.env = environment.APP_URL; //aca estamos diciendo que env es la url del back queda http://localhost:3001/api/
  }

  registerUser(user: any) {
    return this._http.post<any>(this.env + 'user/registerUser', user); //para conectar con el api de backend
  }

  login(user: any) {
    return this._http.post<any>(this.env + 'user/login', user); //para conectar con el api de backend
  }

  loggedIn() {
    return !!localStorage.getItem('token'); //los !! sirven para que esto me retorne un true o false en el localstorage
  }

  getToken() {
    return localStorage.getItem('token'); //para obtener el token que esta almacenado en el localstorage
  }

  logout() {
    localStorage.removeItem('token'); //para eliminar el token con el removeitem
    this._router.navigate(['/login']); //con esto lo redireccionamos al login de nuevo apenas cierre sesion
  }
}
