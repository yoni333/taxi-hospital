import { Action, createReducer, on } from '@ngrx/store';
import * as Auth from './login.actions';
import { IUserDetails } from 'src/app/auth/01-domain/user-details.interface';

export interface StateLogin extends IUserDetails  {

}

export const initialState: StateLogin = {
  displayName: '', uid: '', email: '',user:null
};

const auth = createReducer(
  initialState,
  on(Auth.setUserDetails, (state: StateLogin, userDetails: IUserDetails) => ({
    ...state,
    displayName: userDetails.displayName
      , uid: userDetails.uid
      , email: userDetails.email
      ,user :userDetails.user

  })),
);

export function loginReducer(state: StateLogin | undefined, action: Action) {
  return auth(state, action);
}
