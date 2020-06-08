import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { AuthService } from '../../03-app/auth-service';
import { Observable, Subscription } from 'rxjs';
import { auth } from 'firebase';
import { Router } from '@angular/router';
import { setUserDetails } from 'src/app/infrastructure/ngrx-store/login/login.actions';
import { StateLogin } from 'src/app/infrastructure/ngrx-store/login/login.reducers';
import { IUserDetails } from '../../01-domain/user-details.interface';
import { translateService } from 'src/app/infrastructure/translate/translate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  user$: Observable<StateLogin | null>;
  userSUB: Subscription;
  user: IUserDetails;
  isShowLogin = true;
  dictionary: any = {};
  constructor(
    private router: Router,
    private ngZone: NgZone,
    private _auth: AuthService,
    private translate: translateService

  ) { }

  ngOnInit() {
    this.dictionary = this.translate.dictionary;
    this.user$ = this._auth.user;
    this.userSUB = this.user$.subscribe((user: IUserDetails) => this.user = user);
    this.getCurrentAuth();
    this._auth.getAuthAfterRedirect()
      // TODO  move this dispatch to the service

      .then((loginData: IUserDetails) => {
        console.log('lodin data', loginData);

        if (loginData === undefined || loginData.user === null) {
          this.isShowLogin = true;
          console.log('isShowLogin', this.isShowLogin);
          this.ngZone.run(() =>this.isShowLogin=true)

          return Promise.reject();
        } else {

          this.navigateToNextTravels()
        }
      }).catch(e=>{
        this.isShowLogin = true;
        console.log('isShowLogin', this.isShowLogin);


      })
  }
  getCurrentAuth() {
    // we do it because
    this._auth.getCurrentAuth().subscribe(user => {
      console.log('getCurrentAuth step b',user);
      
      this.isShowLogin = true;
      if (user === undefined || user === null) {
        this.ngZone.run(() =>this.isShowLogin=true)
        
      }else{{
        this.isShowLogin = false;
        this._auth.getAuthAfterRedirect();
      }}

      console.log('isShowLogin', this.isShowLogin);
    });
  }

  login() {
    this.isShowLogin = false;
    this._auth.login().then(
      // we need to use ngZone because google auth service is not part of angular change detection
      // see more "https://www.coditty.com/code/angular-router-navigate-warning-did-you-forget-to-call-ngzonerun"
      (loginData: auth.UserCredential) => this.ngZone.run((loginData) => this.navigateToNextTravels()));

  }
  signOut() {
    this._auth.signOut();
    this.isShowLogin = true;
  }
  navigateToNextTravels() {
    console.log('navigateToNextTravels');

    this.router.navigate(['/next-travels']);
  }

  ngOnDestroy() {
    this.userSUB.unsubscribe();
  }
}
