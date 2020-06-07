import { createAction, props } from '@ngrx/store';
import { IOrbit } from 'src/app/invite-travels/01-domain/orbits-interface';
import { ICarTypes } from '../../../../../../../pych/pych-admin/src/app/admin/interfaces/Icar-types';
import { IStartLocation } from '../../../../../../../pych/pych-admin/src/app/admin/interfaces/i-startLocatins';
import { IOrbitSadir } from '../../../../../../../pych/pych-admin/src/app/admin/interfaces/orbit-sadir';

export enum orbitsActionEnum {
  clearData = '[orbits] clear all orbits data',
  setOrbits = '[orbits] set Orbits',
  startFetchOrbits = '[orbits] start Fetch orbits',
  startFetchOrbitsSadir = '[orbits] start Fetch sadir orbits',
  setOrbitsSadir = '[orbits] set sadir  Orbits',
}

export const clearOrbits = createAction(
  orbitsActionEnum.clearData,
  props()
);
export const setOrbits = createAction(
  orbitsActionEnum.setOrbits,
  props<{ orbits: IOrbit[] }>()
);
export const setOrbitsSadir = createAction(
  orbitsActionEnum.setOrbitsSadir,
  props<{ orbitsSadir: IOrbitSadir[] }>()
);
//  ************************* carsType ************************

export enum carsTypeActionEnum {
  clearData = '[carsType] clear all carsType data',
  setCarsType = '[carsType] set carsType',
  startFetchCarsType = '[carsType] start Fetch carsType',
}


export const clearCarsType = createAction(
  carsTypeActionEnum.clearData,
  props()
);
export const setCarsType = createAction(
  carsTypeActionEnum.setCarsType,
  props<{ carsType: ICarTypes[] }>()
);
//  ************************* start locations ************************

export enum startLocationsActionEnum {
  clearData = '[StartLocations] clear all StartLocations data',
  setStartLocations = '[StartLocations] set StartLocations',
  startFetchStartLocations = '[StartLocations] start Fetch StartLocations',
}


export const clearStartLocations = createAction(
  startLocationsActionEnum.clearData,
  props()
);
export const setStartLocations = createAction(
  startLocationsActionEnum.setStartLocations,
  props<{ startLocations: IStartLocation[] }>()
);