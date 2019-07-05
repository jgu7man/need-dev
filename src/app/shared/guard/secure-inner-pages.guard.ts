import { Injectable } from '@angular/core';
import {  Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { Observable, of } from 'rxjs';
import { take, tap, map, mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SecureInnerPagesGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
   
    return this.authService.user$.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        console.log(loggedIn);
        if (loggedIn) {
          this.router.navigate(['/usuario/perfil']);
        }
      }),
      mapTo(true)
    )
  }
}