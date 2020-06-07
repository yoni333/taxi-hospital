import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from './auth/03-app/auth-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush,

})
export class AppComponent implements OnInit {
  constructor(
     private auth: AuthService
  ) {}
  title = 'drivers';

  ngOnInit() {
    this.auth.setCurrentUser();
  }
}
