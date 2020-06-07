import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { IOrbit } from '../01-domain/orbits-interface';
import { Observable } from 'rxjs';
import { ICarTypes } from '../../../../../../pych/pych-admin/src/app/admin/interfaces/Icar-types';
import { IStartLocation } from '../01-domain/start-location.interface';
import { IOrbitSadir, ESadirSide } from '../../../../../../pych/pych-admin/src/app/admin/interfaces/orbit-sadir';
import { map } from 'rxjs/operators';

@Injectable()
export class OrbitsRepository{
  orbitsPath :string = '/companies/pych/orbits'
  orbitsSadirPath :string = '/companies/pych/orbitSadir'
  carsTypePath :string = '/companies/pych/carTypes'
  startLocationsPath :string = '/companies/pych/startLocation'
  constructor(
    private afs: AngularFirestore

  ){}

  fetchOrbits():Observable<IOrbit[]>{
    return this.afs.collection<IOrbit>(this.orbitsPath).valueChanges()
  }

  fetchOrbitsSadir():Observable<IOrbitSadir[]>{
    return this.afs.collection<IOrbitSadir>(this.orbitsSadirPath).valueChanges().pipe(
      map(orbits=>this.addOrbitDescripionHebrewProp(orbits)),
      map( travels=>travels.filter(travel=>travel.code===ESadirSide.ka).sort( (a,b)=>a.hour-b.hour)
        .concat (travels.filter(travel=>travel.code===ESadirSide.ak).sort( (a,b)=>a.hour-b.hour))
      
      )
    )
  }
  fetchCarsType():Observable<ICarTypes[]>{
    return this.afs.collection<ICarTypes>(this.carsTypePath).valueChanges()
  }
  fetchStartLocations():Observable<IStartLocation[]>{
    return this.afs.collection<IStartLocation>(this.startLocationsPath).valueChanges()
  }
  addOrbitDescripionHebrewProp(orbits:IOrbitSadir[]){
      return orbits.map(orbit=>({...orbit,orbitDescripionHebrew:orbit.name}));
  }
}