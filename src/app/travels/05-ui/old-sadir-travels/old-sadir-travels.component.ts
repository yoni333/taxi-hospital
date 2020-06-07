import { Component, OnInit } from '@angular/core';
import { SadirTravelsService } from '../../03-app/sadir-travels.service';
import { StateTravels } from 'src/app/infrastructure/ngrx-store/travels/travels.reducers';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUserDetails } from 'src/app/auth/01-domain/user-details.interface';
import { ISadirTravel } from '../../01-domain/sadir-travels.interface';
import { SadirTravels } from 'src/app/infrastructure/ngrx-store/travels/travels.selectors';
import { translateService } from 'src/app/infrastructure/translate/translate.service';

@Component({
  selector: 'app-old-sadir-travels',
  templateUrl: './old-sadir-travels.component.html',
  styleUrls: ['./old-sadir-travels.component.css']
})
export class OldSadirTravelsComponent implements OnInit {
  travels$: Observable<ISadirTravel[]>;
  dictionary: any = {};

  constructor(
    private travelService: SadirTravelsService
    , private _store: Store<StateTravels>
    , private translate: translateService

      ) {
  }

  ngOnInit() {
    this.dictionary = this.translate.dictionary;

    this.travels$ = this.getTravels();
  }

  getTravels(): Observable<ISadirTravel[]> {
    // return this.travelService.getCurrentUserTravels();
    return this._store.pipe(select(SadirTravels));

  }

  getCurrentUser(): Observable<IUserDetails> {
    return this.travelService.getCurrentUser();
  }

}
