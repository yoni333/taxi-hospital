import { Injectable } from '@angular/core';
import { createHours, ISelectList, createMinutes, isITravelForm } from './invite-travel.util';
import { Observable } from 'rxjs';
import { IOrbit } from '../01-domain/orbits-interface';
import { OrbitsRepository } from '../02-repository/orbits.repository';
import { ITravelForm } from '../01-domain/travel-form.interface';
import { ETravelType } from 'src/app/shared/travel-type.enum';
import { IPrivateTravel } from 'src/app/travels/01-domain/private-travels.interface';


import { WantedTravels } from '../02-repository/wanted-travel.repository';
import { ICarTypes } from '../../../../../../pych/pych-admin/src/app/admin/interfaces/Icar-types';
import { IStartLocation } from '../01-domain/start-location.interface';
import { StateLogin } from 'src/app/infrastructure/ngrx-store/login/login.reducers';
import { Store, select } from '@ngrx/store';
import { selectAgent } from 'src/app/infrastructure/ngrx-store/login/login.selectors';
import { take } from 'rxjs/operators';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import { MetadataTravels } from './metadata.service';
import { ISadirTravel } from 'src/app/travels/01-domain/sadir-travels.interface';
// import { ICommonTravel } from 'src/app/travels/01-domain/common-travel.interface';
import { IPassengerSadir } from '../../../../../../pych/pych-admin/src/app/admin/interfaces/I-passenger-in-sadir';
import { createMoneyObject } from 'src/app/travels/02-repository/utils.repositoty';
import { IAgent } from '../../../../../../pych/pych-admin/src/app/admin/interfaces/i-agent';
import { IOrbitSadir } from '../../../../../../pych/pych-admin/src/app/admin/interfaces/orbit-sadir';
dayjs.extend(utc)
@Injectable({ providedIn: 'root' })
export class InviteTravel {

  constructor(
    private orbitsRepository: OrbitsRepository,
    private storeLogin: Store<StateLogin>,

    private wantedTravels: WantedTravels,
    private metadataTravels: MetadataTravels
  ) { }

  fetchOrbits(): Observable<IOrbit[]> {
    return this.orbitsRepository.fetchOrbits();
  }
  fetchOrbitsSadir(): Observable<IOrbitSadir[]> {
    return this.orbitsRepository.fetchOrbitsSadir();
  }
  fetchCarsType(): Observable<ICarTypes[]> {
    return this.orbitsRepository.fetchCarsType();
  }
  fetchStartLocations(): Observable<IStartLocation[]> {
    return this.orbitsRepository.fetchStartLocations();
  }

  saveWantedTravel(travelForm: ITravelForm): Promise<void> {
    if (!isITravelForm(travelForm)) { console.error('not ITravelForm - cant save to database'); return }

    return this.storeLogin.pipe(take(1), select(selectAgent)).toPromise()
      .then(agent => {

        travelForm.additionalData.agent = agent;
        if (travelForm.additionalData.travelType === ETravelType.private) {
          return this.wantedTravels.addWanted(this.createPrivateTravel(travelForm));
        } else if (travelForm.additionalData.travelType === ETravelType.sadir) {
          return this.wantedTravels.addWanted(this.createSadirTravel(travelForm));

        } else {
          return Promise.reject(() => alert('not sadir nor private - cant save to database'));
        }
      })



  }

  createSadirTravel(travelForm: ITravelForm): ISadirTravel {

    console.log(travelForm.date.hour + ':' + travelForm.date.minute);
    const dateAndTimeUNIX = travelForm.date.date.add(travelForm.date.hour, 'hour').add(travelForm.date.minute, 'minute').valueOf();

    return {


      id: '',
      travelNumber: 0,
      code: '',
      // createBy: '',
      dateStartUNIXmoment: dateAndTimeUNIX,
      dateStartTraveling: dayjs.utc(travelForm.date.date).format('YYYY-MM-DD'),
      hourStartTraveling: '',
      startTravelLocation: travelForm.additionalData.startLocation,
      amountOfpeoples: 0,
      // destination: '',
      orbit: travelForm.additionalData.orbit as IOrbitSadir,
      dateArrivalDestination: '',
      hourArrivalDestination: '',
      car: null,
      carType: travelForm.carType,
      numberOfSits: 0,
      driverName: '',
      driverCode: '',
      company: null,
      passengers: travelForm.names.map(passenger =>  this.createPassengers(passenger,travelForm.additionalData.agent) ),
      dateOfCreation: dayjs.utc().valueOf(),
      price: 0,
      total: 0,
      isPayed:false,

      travelState: '',
      isAssigned: false,
      // TODO add  special agent calc 
      // TODO show travel cost

      isAgentTravel: true,
      // nameOfAgent: '',
      agent: travelForm.additionalData.agent,
      // codeOfAgentTravel: '',
      waitingCost: 0,
      waitingPlace: '',
      waitngDays: 0,
        metadata: this.metadataTravels.create(),
      notes: travelForm.additionalData.notes,

      travelType: travelForm.additionalData.travelType,
      agentsId: [travelForm.additionalData.agent.agentAppUID],
      money:createMoneyObject(),

    }

  }
  createPassengers(passenger: string,agent:IAgent): IPassengerSadir {
    return {
      id: null,
      travelsID: null,
      name: passenger,
      // price: 0,
      phone: '',
      // pay: 0,
      agent: agent,
      startLocation: null,
      amountOfPassengers: null,
      notes: '',
      type: ETravelType.sadir,
      money: createMoneyObject(),
    };
  }
  createPrivateTravel(travelForm: ITravelForm): IPrivateTravel {

    console.log(travelForm.date.hour + ':' + travelForm.date.minute);
    const dateAndTimeUNIX = travelForm.date.date.add(travelForm.date.hour, 'hour').add(travelForm.date.minute, 'minute').valueOf();

    return {


      id: '',
      travelNumber: 0,
      code: '',
      dateReservation: dayjs.utc().format('YYYY-MM-DD hh:mm'),
      dateStartUNIXmoment: dateAndTimeUNIX,
      dateStartTraveling: dayjs.utc(travelForm.date.date).format('YYYY-MM-DD'),
      hourStartTraveling: '',
      flightNumber: '',
      startTravelLocation: travelForm.additionalData.startLocation,
      amountOfpeoples: 0,
      orbit: travelForm.additionalData.orbit,
      dateArrivalDestination: '',
      hourArrivalDestination: '',
      nameOfCustomer: travelForm.names[0],
      phone1: '',
      phone2: '',
      car: null,
      carType: travelForm.carType,
      numberOfSits: 0,
      driverName: '',
      driverCode: '',
      company: null,



      travelState: '',
      isAssigned: false,
      // TODO add  special agent calc 
      // TODO show travel cost
      money: {
        price: 0,
        allowMoneyReceivedFromDriver: true,
        isDriverUpdateMoneyReceived: false,

        companyWorkerCharge: '',
        driverPart: 0,
        ourPart: 0,
        agentPart: 0,


        actualChargePych: 0,
        actualChargeDriver: 0,
        actualChargeAgent: 0,


        driverPartPayed: 0,
        ourPartPayed: 0,
        agentPartPayed: 0,


        needToChargePych: 0,
        needToChargeDriver: 0,
        needToChargeAgent: 0,

        moneyReceivedPych: 0,
        moneyReceivedFromDriver: 0,
        moneyReceivedFromAgent: 0,
        hotel: 0,
      },
      isAgentTravel: true,
      agent: travelForm.additionalData.agent,
      destinationChanges: '',
      waitingCost: 0,
      waitingPlace: '',
      waitngDays: 0,
      dateTravelBack: '',
      additonalStops: [],
      metadata: this.metadataTravels.create(),
      notes: travelForm.additionalData.notes,

      travelType: travelForm.additionalData.travelType
    }

  }

  get hours(): ISelectList<number>[] {

    return createHours();
  }
  get minutes(): ISelectList<number>[] {

    return createMinutes();
  }

}
