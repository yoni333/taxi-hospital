import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, iif } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(
    public afAuth: AngularFireAuth
    , private _router: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.getCurrentAuth();
  }


  getCurrentAuth(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map((user: User) => !!user)
      , tap((isLog: boolean) => {
        if (!isLog) {
          this._router.navigate(['/login']);
         }
      })
    );
  }



}
