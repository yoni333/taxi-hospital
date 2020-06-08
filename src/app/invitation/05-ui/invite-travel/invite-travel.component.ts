import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IInvitation, IUser } from '../../01-domain/invite.interface';
import { InvitationService } from '../../03-app/invite.service';
// import { Moment } from 'moment';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invite-travel',
  templateUrl: './invite-travel.component.html',
  styleUrls: ['./invite-travel.component.css']
})
export class InviteTravelComponent implements OnInit ,OnDestroy {
  user:IUser;
  userSUB: Subscription;
  inviteFormGroup: FormGroup;

  constructor(
    private invitationService: InvitationService
    ,private router :Router
    ,    private ngZone: NgZone,

    ) { }

  ngOnInit() {
    this.inviteFormGroup = new FormGroup({
      date: new FormControl(),
      direction: new FormControl(),
      shift: new FormControl(),
      address: new FormControl()

    });

    this.userSUB=  this.invitationService.currentUser.subscribe(user=>{
      this.user=user
      this.inviteFormGroup.controls.address.setValue(user.address)
      console.log('user', this.user);
      if (user ===undefined){
        this.reloadPage()
      }
      // this.inviteFormGroup.controls.address.setValue(`${this.user.address} ${this.user.neighborhood} ${this.user.city}`)
    });
   
  }

  invite() {
    const formData =  JSON.parse( JSON.stringify(this.inviteFormGroup.value) );
    const invitation: IInvitation = {
      user: this.user,
      ...formData
      , date: this.invitationService.createUnixDate(  this.inviteFormGroup.controls.date.value )
     };
    this.addInvitation(invitation);
  }



  addInvitation(invitation: IInvitation){
    this.invitationService.addInvitation(invitation).then(res => {
      const msg = 'נסיעתך מרשמה במערכת';
      alert(msg);
     })
  }

  allowChangeAdress(address){
    console.log('allowChangeAdress', address);

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.userSUB.unsubscribe();
  }
  reloadPage(){
    console.log('reloadpage!')
    this.router.navigate(['/invite-travel'])

    // we do it because a bug og delay till the user login data came from server
    this.ngZone.run(data=>{
      this.router.navigate(['/invite-travel'])

    })
  }

}
