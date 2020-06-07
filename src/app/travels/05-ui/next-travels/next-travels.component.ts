 import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IPrivateTravel } from '../../01-domain/private-travels.interface';
import { Observable, combineLatest } from 'rxjs';
import * as dayjs from 'dayjs';
import { map } from 'rxjs/operators';
import { StateTravels } from 'src/app/infrastructure/ngrx-store/travels/travels.reducers';
import { Store, select } from '@ngrx/store';
import { nextPrivateTravels, nextSadirTravels } from 'src/app/infrastructure/ngrx-store/travels/travels.selectors';
import { travelsActionEnum } from 'src/app/infrastructure/ngrx-store/travels/travels.actions';
import { translateService } from 'src/app/infrastructure/translate/translate.service';
import { ISadirTravel } from '../../../../../../../pych/pych-admin/src/app/admin/interfaces/ISadir';

@Component({
  selector: 'app-next-travels',
  templateUrl: './next-travels.component.html',
  styleUrls: ['./next-travels.component.css']
  , changeDetection: ChangeDetectionStrategy.OnPush

})
export class NextTravelsComponent implements OnInit {
  travels$: Observable<IPrivateTravel[]|ISadirTravel[]>;
  todayTravels$: Observable<IPrivateTravel[]|ISadirTravel[]>;
  futureTravels$: Observable<IPrivateTravel[]|ISadirTravel[]>;
  dictionary: any = {};
  constructor(
    private _store: Store<StateTravels>
    , private translate: translateService

  ) {

  }

  ngOnInit() {
    this.dictionary = this.translate.dictionary;

    // TODO remove this dispatch to travel service
    // this._store.dispatch({type:travelsActionEnum.startFetchNextPrivateTravels})
    this.todayTravels$ = this.filterTodayTravels(this.getTravels());
    this.futureTravels$ = this.filterFutureTravels(this.getTravels());
  }


  getTravels(): Observable<IPrivateTravel[]|ISadirTravel[]> {
    // return this._store.pipe(select(nextPrivateTravels))
    return combineLatest(this._store.pipe(select(nextSadirTravels)), this._store.pipe(select(nextPrivateTravels))).pipe(
      map(([sadirTravels, privateTravels]) => {
        console.log('privateTravels type', privateTravels[0]);
        console.log('sadirTravels type', sadirTravels[0]);
        return (sadirTravels as any[]).concat(privateTravels).sort(
          (travelA, travelB) => travelA.dateStartUNIXmoment - travelB.dateStartUNIXmoment

        );
      }
      )
    );
  }

  filterTodayTravels(travels$: Observable<IPrivateTravel[]|ISadirTravel[]>): Observable<IPrivateTravel[]|ISadirTravel[]> {

    return travels$.pipe(
      map(
        // TODO replace the fake daate in urrent date
        //@ts-ignore
        (travels: IPrivateTravel[]|ISadirTravel[]) => travels.filter(travel => travel.dateStartUNIXmoment > this.getToday()
          && travel.dateStartUNIXmoment < this.getTomorrow())
      ));

  }
  fakeOldDate() {
    console.log(dayjs('2019-08-08').valueOf());

    return dayjs('2019-11-22').valueOf();
  }

  filterFutureTravels(travels$: Observable<IPrivateTravel[]|ISadirTravel[]>): Observable<IPrivateTravel[]|ISadirTravel[]> {

    return travels$.pipe(
      map(
        //@ts-ignore
        (travels: IPrivateTravel[]|ISadirTravel[]) => travels.filter(travel => travel.dateStartUNIXmoment > this.getTomorrow())
      ));

  }

  getToday() {
    // Unix Date In Miliseconds
    return dayjs().startOf('day').valueOf();
  }
  getTomorrow() {
    // Unix Date In Miliseconds
    return dayjs().startOf('day').add(1, 'day').valueOf();
  }


}
