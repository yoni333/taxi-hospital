import { createAction, props } from '@ngrx/store';
import { IUserDetails } from 'src/app/auth/01-domain/user-details.interface';

export const setUserDetails = createAction(
  '[Auth] UserDetails',
  props<IUserDetails>()
);
