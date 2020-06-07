import { Component, OnInit } from '@angular/core';
import { PrivateTravelsService } from '../../03-app/private-travels.service';
import { Observable } from 'rxjs';
import { IPrivateTravel } from '../../01-domain/private-travels.interface';
import { IUserDetails } from 'src/app/auth/01-domain/user-details.interface';
import { Store, select } from '@ngrx/store';
import { StateTravels } from 'src/app/infrastructure/ngrx-store/travels/travels.reducers';
import { PrivateTravels } from 'src/app/infrastructure/ngrx-store/travels/travels.selectors';
import { translateService } from 'src/app/infrastructure/translate/translate.service';

@Component({
  selector: 'app-old-travels',
  templateUrl: './old-travels.component.html',
  styleUrls: ['./old-travels.component.css']
})
export class OldTravelsComponent implements OnInit {
  travels$: Observable<IPrivateTravel[]>;
  dictionary: any = {};

  constructor(
    private travelService: PrivateTravelsService
    , private _store: Store<StateTravels>
    , private translate: translateService

      ) {
  }

  ngOnInit() {
    this.dictionary = this.translate.dictionary;

    this.travels$ = this.getTravels();
  }

  getTravels(): Observable<IPrivateTravel[]> {
    // return this.travelService.getCurrentUserTravels();
    return this._store.pipe(select(PrivateTravels));

  }

  getCurrentUser(): Observable<IUserDetails> {
    return this.travelService.getCurrentUser();
  }

}
