import { Injectable } from '@angular/core';
import { provideRoutes } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { StateLogin } from 'src/app/infrastructure/ngrx-store/login/login.reducers';
import { IUserDetails } from '../01-domain/user-details.interface';
import { selectLoginFeature } from 'src/app/infrastructure/ngrx-store/login/login.selectors';
import { Observable } from 'rxjs';
import { setUserDetails } from 'src/app/infrastructure/ngrx-store/login/login.actions';

@Injectable({providedIn: 'root'})

export class AuthRepository {
  constructor(private store: Store<StateLogin>) {

  }

  setUserDetails(user: IUserDetails) {
    this.store.dispatch(setUserDetails(user));
  }
  getUserDetails(): Observable<IUserDetails | null> {
    return this.store.pipe(select(selectLoginFeature));
  }
}
