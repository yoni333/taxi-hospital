import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { IPrivateTravel } from '../../01-domain/private-travels.interface';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { Router } from '@angular/router';
import { PrivateTravelsService } from '../../03-app/private-travels.service';
import { SadirTravelsService } from '../../03-app/sadir-travels.service';
import { ETravelType } from '../../../shared/travel-type.enum';
import { IPassenger, ISadirTravel } from '../../01-domain/sadir-travels.interface';
import {calcPrice} from '../../03-app/utils.app';
import { translateService } from 'src/app/infrastructure/translate/translate.service';
import { IMoneyManagement } from '../../01-domain/money-management.interface';
// @ts-ignore
@Component({
  selector: 'app-next-travels-table',
  templateUrl: './travels-table.component.html',
  styleUrls: ['./travels-table.component.css']
  , animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush

})

export class NextTravelsTableComponent implements OnInit {
   expandedElement: any | null;
   public calcPrice = calcPrice;
   public travelType = ETravelType;
   public dictionary: any = {};

  @Input() travels$: Observable<ISadirTravel|IPrivateTravel[]>;
  displayedColumns: string[] = [
            'car.carTypeUkrain'
            , 'hourStartTraveling'
            , 'price'
            , 'orbit.orbitShortName'
            // ,'dateStartUNIXmoment'
            , 'dateStartTraveling'
            , 'agentPart'



            // ,'company.driverAppEmail'
          ];

  constructor(
    private router: Router
    , private travelsService: PrivateTravelsService
    , private sadirService: SadirTravelsService
    , private translate: translateService

    ) {

   }

  ngOnInit() {
    this.dictionary = this.translate.dictionary;


  }
  changeELM(elm) {
    console.log(elm);

  }
  showTravelScreenForCustomer(travelUID: string) {
    Promise.resolve( this.travelsService.setCurrentPrivateTravelUID(travelUID) ).then(
      () =>     this.router.navigate(['/passengers-names/' , {type:ETravelType.private}]).then(console.log).catch(console.log).catch(console.log)
    );

  }
  showSadirTravelScreenForCustomer(travelUID: string) {
    Promise.resolve( this.sadirService.setCurrentSadirTravelUID(travelUID) ).then(
      () =>     this.router.navigate(['/passengers-names/', {type:ETravelType.sadir} ]).then(console.log).catch(console.log).catch(console.log)
    );

  }
  saveChargeMoneyAmount({travelId, amount, moneyManagement}: {travelId: string, amount: number, moneyManagement: IMoneyManagement}) {
    console.log('e', travelId, amount, moneyManagement.isDriverUpdateMoneyReceived, moneyManagement.allowMoneyReceivedFromDriver);
    this.travelsService.updatePrivateTravelCharge(travelId, amount, moneyManagement);
  }

  saveChargeMoneySadirAmount({travelId, amount, passengersData, isDriverUpdateMoneyReceived, allowMoneyReceivedFromDriver}: {travelId: string, amount: number, passengersData: IPassenger[], isDriverUpdateMoneyReceived: boolean, allowMoneyReceivedFromDriver: boolean}) {

    console.log('e', travelId, amount, passengersData, isDriverUpdateMoneyReceived, allowMoneyReceivedFromDriver);

    this.sadirService.updateSadirTravelCharge(travelId, amount, passengersData, isDriverUpdateMoneyReceived, allowMoneyReceivedFromDriver);
  }


}
