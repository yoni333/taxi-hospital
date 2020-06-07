import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { InviteTravel } from '../../03-app/invite-travel.service';
import { ISelectList } from '../../03-app/invite-travel.util';
import { ETravelType } from 'src/app/shared/travel-type.enum';
import { StateOrbits } from 'src/app/infrastructure/ngrx-store/orbits/orbits.reducers';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IOrbit } from '../../01-domain/orbits-interface';
import { selectOrbits, selectCarsType } from 'src/app/infrastructure/ngrx-store/orbits/orbits.selectors';
import { map } from 'rxjs/operators';
import { MatStepper } from '@angular/material';
import { ITravelForm } from '../../01-domain/travel-form.interface';
import { IStartLocation } from '../../01-domain/start-location.interface';
import { ICarTypes } from '../../../../../../../pych/pych-admin/src/app/admin/interfaces/Icar-types';
import { StateLogin } from 'src/app/infrastructure/ngrx-store/login/login.reducers';
import { selectAgent } from 'src/app/infrastructure/ngrx-store/login/login.selectors';
import { IOrbitSadir } from '../../../../../../../pych/pych-admin/src/app/admin/interfaces/orbit-sadir';

@Component({
  selector: 'app-invite-travel',
  templateUrl: './invite-travel.component.html',
  styleUrls: ['./invite-travel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class InviteTravelComponent implements OnInit {

  @ViewChild('stepper', { read: false, static: false }) stepper: MatStepper;
  public ETravelType = ETravelType;
  dateFormGroup: FormGroup;
  namesFormGroup: FormGroup;
  additionalDataFormGroup: FormGroup;
  travelFormGroup: FormGroup;
  carTypeFormGroup: FormGroup;
  hours: ISelectList<number>[] = this.inviteTravel.hours;
  minutes: ISelectList<number>[] = this.inviteTravel.minutes;
  carTypes$: Observable<ISelectList<ICarTypes>[]> = this.storeOrbits.pipe(select(selectCarsType), map(carTypes => carTypes.map(carType => ({ value: carType, label: carType.carTypeHebrew }))))
  constructor(
    private inviteTravel: InviteTravel,
    private storeOrbits: Store<StateOrbits>,
  ) { }

  ngOnInit() {

    this.initForms();
    this.travelType = true;

  }


  initForms() {
    this.dateFormGroup = new FormGroup({
      date: new FormControl(),
      hour: new FormControl(),
      minute: new FormControl(),
    });
    // TODO add string only validators
    this.namesFormGroup = new FormGroup({
      names: new FormArray([new FormControl()], [Validators.minLength(1)])
    });
    this.additionalDataFormGroup = new FormGroup({
      travelType: new FormControl(ETravelType.private, [Validators.required]),
      orbit: new FormControl('', [Validators.required]),
      startLocation: new FormControl(),
      notes: new FormControl(),
    });

    this.carTypeFormGroup = new FormGroup({
      carType: new FormControl(null, [Validators.required]),

    })


    this.travelFormGroup = new FormGroup({
      date: this.dateFormGroup,
      names: this.names,
      additionalData: this.additionalDataFormGroup,
      carType: this.carTypeFormGroup.controls.carType,
    });


  }

  addName(name = '') {
    this.names.push(new FormControl(name));
  }
  removeCustomer(i: number) {
    if (this.names.length <= 1) { return }
    this.names.removeAt(i);
  }
  get names(): FormArray { return this.namesFormGroup.get('names') as FormArray; }

  set travelType(isPrivate: boolean) {

    if (isPrivate) {

      this.additionalDataFormGroup.controls.travelType.setValue(ETravelType.private);
      this.resetOrbitAndLocation()
      const name = this.names.controls[0].value;

      this.names.clear();
      this.addName(name);

    } else {
      this.resetOrbitAndLocation()
      this.additionalDataFormGroup.controls.travelType.setValue(ETravelType.sadir);
      this.carTypeFormGroup.controls.carType.clearValidators()
      this.carTypeFormGroup.controls.carType.updateValueAndValidity()

    }
  }

  resetOrbitAndLocation() {
    this.additionalDataFormGroup.controls.orbit.reset();
    this.additionalDataFormGroup.controls.startLocation.reset();
    this.additionalDataFormGroup.updateValueAndValidity();
  }

  carTypeChange(e) {
    // must have it because a bug in formGroup update;
    this.carTypeFormGroup.updateValueAndValidity();

  }

  selectedOrbit(orbit: IOrbit | IOrbitSadir): void {
    this.additionalDataFormGroup.controls.orbit.setValue(orbit);
    if (!this.travelType) {
      // sadir travel
      const o = orbit as IOrbitSadir;
      this.dateFormGroup.controls.hour.setValue(o.hour);
      this.dateFormGroup.controls.minute.setValue(o.minutes);
    }
  }

  selectedStartLocation(startLocation: IStartLocation) {
    this.additionalDataFormGroup.controls.startLocation.setValue(startLocation);
  }

  saveTravel() {
    const newTravel: ITravelForm = this.travelFormGroup.getRawValue();
    console.log('newTravel', newTravel);

    const answer = `הנסיעה הוכנסה בהצלחה`;
    this.inviteTravel.saveWantedTravel(newTravel).then(res => alert(answer)).then(() => {
      this.stepper.reset();
    })
  }

  get travelType(): boolean {
    return (this.additionalDataFormGroup.controls.travelType.value === ETravelType.private ? true : false);

  }

}
