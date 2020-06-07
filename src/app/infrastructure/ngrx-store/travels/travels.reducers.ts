import { Action, createReducer, on } from '@ngrx/store';
import * as Travels from './travels.actions';
import { IPrivateTravel } from 'src/app/travels/01-domain/private-travels.interface';
import { ISadirTravel } from 'src/app/travels/01-domain/sadir-travels.interface';

export interface StateTravels {
  privateTravels: IPrivateTravel[];
  nextPrivateTravels: IPrivateTravel[];
  sadirTravels: ISadirTravel[];
  nextSadirTravels: ISadirTravel[];
  currentPrivate: string;
  currentSadir: string;
}

export const initialState: StateTravels = {
  privateTravels: [], nextPrivateTravels: [], sadirTravels: [], nextSadirTravels: [], currentPrivate: '', currentSadir: ''
};

const travels = createReducer(
  initialState,
  on(Travels.clearDataTravels, () => (initialState)),
  on(Travels.setPrivateTravels, (state: StateTravels, { privateTravels }) => {
    // console.log('setPrivateTravels reducer ', privateTravels);

    return ({
      ...state
      , privateTravels
    });
  }),
  on(Travels.setNextPrivateTravels, (state: StateTravels, { privateTravels }) => {
    // console.log('setNextPrivateTravels reducer ', privateTravels);
    return ({
      ...state
      , nextPrivateTravels: privateTravels
    });
  }),
  on(Travels.setSadirTravels, (state: StateTravels, { sadirTravels }) => ({
    ...state
    , sadirTravels
  })),
  on(Travels.setNextSadirTravels, (state: StateTravels, { sadirTravels }) => {
    // console.log('setNextSadirTravels reducer ', sadirTravels);
    return ({
      ...state
      , nextSadirTravels: sadirTravels
    });
  }),
  on(Travels.setCurrentSadirTravels, (state: StateTravels, { sadirUID }) => ({
    ...state
    , currentSadir: sadirUID
  })),
  on(Travels.setCurrentPrivateTravels, (state: StateTravels, { privateUID }) => ({
    ...state
    , currentPrivate: privateUID
  })),
);

export function travelsReducer(state: StateTravels | undefined, action: Action) {
  return travels(state, action);
}
