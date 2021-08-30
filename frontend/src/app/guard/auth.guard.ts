import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _userService: UserService, private _router: Router) {}

  canActivate(): boolean {
    if (!this._userService.loggedIn()) {
      //aqui validamos si hay token o no
      this._router.navigate(['/login']); //si no hay ningun token siempre lo mandara al login
      return false; //para que no pueda ver las url si no esta logueado
    } else {
      return true; //si puede ver las url que estan protegidas
    }
  }
}
