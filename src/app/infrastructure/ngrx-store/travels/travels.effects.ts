import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, mergeAll } from 'rxjs/operators';
import { PrivateTravelsService } from 'src/app/travels/03-app/private-travels.service';
import { travelsActionEnum, setNextPrivateTravels, setPrivateTravels, clearDataTravels, setSadirTravels, setNextSadirTravels } from './travels.actions';
import { IPrivateTravel } from 'src/app/travels/01-domain/private-travels.interface';
import { SadirTravelsService } from 'src/app/travels/03-app/sadir-travels.service';
import { ISadirTravel } from 'src/app/travels/01-domain/sadir-travels.interface';

@Injectable()
export class TravelsEffects {

  loadNextPrivateTravels$ = createEffect(() => this.actions$.pipe(
    ofType(travelsActionEnum.startFetchNextPrivateTravels),
    mergeMap(() => this.privateTravelsService.getCurrentUserNextTravels()
      .pipe(
        map((privateTravels: IPrivateTravel[]) => {
          // console.log('effect travel', privateTravels);
          return (setNextPrivateTravels({ privateTravels }));
        },
          catchError((err) => { console.log('loadNextTravels', err); return EMPTY; })
        ))
    )
  )
  );

  loadPrivateTravels$ = createEffect(() => this.actions$.pipe(
    ofType(travelsActionEnum.startFetchPrivateTravels),
    mergeMap(() => this.privateTravelsService.getCurrentUserTravels()
      .pipe(
        map((privateTravels: IPrivateTravel[]) => {
          // console.log('effect travel', privateTravels);
          return (setPrivateTravels({ privateTravels }));
        },
          catchError((err) => { console.log('loadNextTravels', err); return EMPTY; })
        ))
    )
  )
  );


  loadSadirNextTravels$ = createEffect(() => this.actions$.pipe(
    ofType(travelsActionEnum.startFetchNextSadirTravels),
    mergeMap(() => this.sadirTravelsService.getCurrentUserNextTravels()
      .pipe(
        map((sadirTravels: ISadirTravel[]) => {
          console.log('effect next sadir travel', sadirTravels); return (setNextSadirTravels({ sadirTravels }));
        },
          catchError((err) => { console.log('loadNext sadir Travels', err); return EMPTY; })
        ))
    )
  )
  );


  loadSadirTravels$ = createEffect(() => this.actions$.pipe(
    ofType(travelsActionEnum.startFetchSadirTravels),
    mergeMap(() => this.sadirTravelsService.getCurrentUserTravels()
      .pipe(
        map((sadirTravels: ISadirTravel[]) => {
          console.log('effect travel sadir', sadirTravels); return (setSadirTravels({ sadirTravels }));
        },
          catchError((err) => { console.log('loadNextTravels', err); return EMPTY; })
        ))
    )
  )
  );



  constructor(
    private actions$: Actions,
    private privateTravelsService: PrivateTravelsService
    , private sadirTravelsService: SadirTravelsService
  ) { }
}
