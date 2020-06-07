import { ETravelType } from 'src/app/shared/travel-type.enum';
import { IOrbit } from './orbits-interface';
import { Dayjs } from 'dayjs';
import { ICarTypes } from '../../../../../../pych/pych-admin/src/app/admin/interfaces/Icar-types';
import { IAgent } from '../../../../../../pych/pych-admin/src/app/admin/interfaces/i-agent';
import { IStartLocation } from '../../../../../../pych/pych-admin/src/app/admin/interfaces/i-startLocatins';
import { IOrbitSadir } from '../../../../../../pych/pych-admin/src/app/admin/interfaces/orbit-sadir';

export interface ITravelForm{
  date:{
    date:Dayjs;
    hour:number;
    minute:number;
  };
  names:string[];
  additionalData:{
    travelType:ETravelType;
    orbit:IOrbit |IOrbitSadir;
    notes:string;
    agent:IAgent;
    startLocation:IStartLocation;
  };
  carType:ICarTypes;

}