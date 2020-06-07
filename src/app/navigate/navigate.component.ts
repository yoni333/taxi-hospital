import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthRepository } from '../auth/02-repository/auth-store.repository';
import { IUserDetails } from '../auth/01-domain/user-details.interface';
import { Store, select } from '@ngrx/store';
import { countNextPrivateTravels, nextTravelsCounter } from '../infrastructure/ngrx-store/travels/travels.selectors';
import { StateTravels } from '../infrastructure/ngrx-store/travels/travels.reducers';
import { translateService } from '../infrastructure/translate/translate.service';

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.css']
})
export class NavigateComponent implements OnInit {
  currentUser: Observable<IUserDetails>;
  privateTravelsCounter: Observable<number>;
  dictionary: any = {};
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver
    , private authRepository: AuthRepository
    , private _store: Store<StateTravels>
    , private translate: translateService

    ) {

    }
    ngOnInit() {
      this.dictionary = this.translate.dictionary;

      this.getUserDetails();
      this.countPrivateTravels();
    }
    getUserDetails() {
       this.currentUser = this.authRepository.getUserDetails();
    }

    countPrivateTravels() {
     this.privateTravelsCounter =  this._store.pipe(select(nextTravelsCounter));
    }

}
