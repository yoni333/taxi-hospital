import { IPrivateTravel } from '../01-domain/private-travels.interface';
import { ISadirTravel } from '../01-domain/sadir-travels.interface';
import { ETravelType } from '../../shared/travel-type.enum';
import { IMoneyManagement } from '../01-domain/money-management.interface';

export function addTravelType<T extends IPrivateTravel|ISadirTravel>(travels: T[], type: ETravelType): T[] {

  return travels.map(travel => {
    travel.travelType = type;
    return travel;
  }
  );
}

export function convertOrbitField<T extends ISadirTravel>(travels: T[], type: ETravelType): T[] {

  return travels.map(travel => {
    console.log(travel);
    
    travel.orbit.orbitDescripionHebrew =   travel.orbit.name;
  
    return travel;
  }
  );
}

export function isAllowUpdateCharge(allowMoneyReceivedFromDriver: boolean): boolean {

  if (allowMoneyReceivedFromDriver) { return true; } else {
    alert ('Вы не можете обновить эту поездку.  Для обновления звоните Нахману.ks');
    throw new Error('you not allow update money charge any more');
  }
}



export  function  updateMoneyVersion(travel: IPrivateTravel) {
  if (travel.money !== undefined) { return travel; }

  travel.money = createMoneyObject();
  // @ts-ignore
  travel.money.price = travel.price;

  return travel;
}

export  function createMoneyObject():IMoneyManagement {
  return {
    price: 0,
    companyWorkerCharge:'',
    allowMoneyReceivedFromDriver: true,
    isDriverUpdateMoneyReceived: false,

    driverPart: 0,
    ourPart: 0,
    agentPart: 0,


    driverPartPayed: 0,
    ourPartPayed: 0,
    agentPartPayed: 0,

    actualChargePych: 0,
    actualChargeDriver: 0,
    actualChargeAgent: 0,


    needToChargePych: 0,
    needToChargeDriver: 0,
    needToChargeAgent: 0,

    moneyReceivedPych: 0,
    moneyReceivedFromDriver: 0,
    moneyReceivedFromAgent: 0,
    hotel:0,
  };
}
