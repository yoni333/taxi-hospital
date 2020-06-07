import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { loginReducer, StateLogin } from './login/login.reducers';
import { StateTravels, travelsReducer } from './travels/travels.reducers';
import { dictionaryReducer, StateDictionary } from './dictionary/dictionary.ngrx';
import { orbitsReducers, StateOrbits } from './orbits/orbits.reducers';


export interface State {
  auth: StateLogin;
  travels: StateTravels;
  dictionary: StateDictionary;
  orbits: StateOrbits;
}

export const reducers: ActionReducerMap<State> = {
    auth: loginReducer
    , travels: travelsReducer
    , dictionary: dictionaryReducer
    , orbits: orbitsReducers
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
