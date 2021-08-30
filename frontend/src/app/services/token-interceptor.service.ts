import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'; //para invocar el http interceptor de angular
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
//export class HttpInterceptor implements HttpInterceptor {}
export class TokenInterceptorService implements HttpInterceptor {
  ///le estamos diciendo que herede todo del HttpInterceptor ya que solo necesito una funcion y no todo la clase de http

  constructor(private _userService: UserService) {}

  intercept(req: any, next: any) {
    const tokenReq = req.clone({
      //clonamos el token del usuario
      setHeaders: {
        //ingresamos al header y obtenemos el yoken
        Authorization: 'Bearer ' + this._userService.getToken(),
      },
    });
    return next.handle(tokenReq); //retornamos el token
  }
}

