import { createSelector, createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { StateLogin } from './login.reducers';
import { IUserDetails } from 'src/app/auth/01-domain/user-details.interface';
import { IUser } from 'src/app/shared/user.interface';

export const selectLoginFeature: MemoizedSelector<object, IUserDetails> = createFeatureSelector('auth');
export const selectLoginUID: MemoizedSelector<object, string> = createSelector(selectLoginFeature, (state: StateLogin) => state.uid);
export const selectUser: MemoizedSelector<object, IUser> = createSelector(selectLoginFeature, (state: StateLogin) => state.user);
export const selectUserEmailName: MemoizedSelector<object, {email:string,displayName:string}> = createSelector(selectLoginFeature, (state: StateLogin) => ({email:state.email,displayName:state.displayName}));
