import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonalDetailsService } from '../../03-app/perosnal-details.service';
import { IUser } from 'src/app/shared/user.interface';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit,OnDestroy {
  currentUser:IUser
  currentUserSUB:Subscription
  userForm:FormGroup
  constructor(
    private personalService:PersonalDetailsService
  ) { 

    this.userForm= new FormGroup({
      address:new FormControl(),
      city:new FormControl(),
      neighborhood:new FormControl(),
      phone1:new FormControl(),
      fullName:new FormControl(),
      // phone2:new FormControl(user.phone2),
    })
  }
  initForm(user:IUser){
      this.userForm.controls.address.setValue(user.address);
      this.userForm.controls.city.setValue(user.city);
      this.userForm.controls.neighborhood.setValue(user.neighborhood);
      this.userForm.controls.phone1.setValue(user.phone1);
      this.userForm.controls.fullName.setValue(user.fullName);
  }

  ngOnInit() {
    this.currentUserSUB = this.personalService.user.pipe(

      tap(user=>{
        if (user!==null){

          this.initForm(user);
        }
      })
    )
    
    .subscribe(user=>this.currentUser=user);
  }

  updateDetails(){
    const details =JSON.parse ( JSON.stringify( this.userForm.value ) );
    const user ={...this.currentUser,...details}
    this.personalService.updateUserDetails(user)
  }
  ngOnDestroy(){
    this.currentUserSUB.unsubscribe()
  }
}
