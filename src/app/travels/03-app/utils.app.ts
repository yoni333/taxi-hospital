import { ETravelType } from '../../shared/travel-type.enum';
import { IPassenger, ISadirTravel } from '../01-domain/sadir-travels.interface';
import { IPrivateTravel } from '../01-domain/private-travels.interface';

export function calcPrice(travel: IPrivateTravel|ISadirTravel): number {
  if (travel.travelType ===ETravelType.sadir) {
    //@ts-ignore
      return calcSadirPrice(travel)
  } else {
        //@ts-ignore
    return travel.money.price;
  }
}

function calcSadirPrice(travel:ISadirTravel):number{
  // console.log('price', travel.passengers.map((passenger: IPassenger) => passenger.price)
  // // @ts-ignore
  // .reduce((acc, price) => Number.parseInt( acc) + Number.parseInt(price)));
  // console.log('chexk' , travel.passengers);
  // undefined  0
  // []  0
  if ( !travel.passengers ){ return 0;}
  if (  travel.passengers.length === 0  ){ return 0;}
  return travel.passengers.map((passenger: IPassenger) => passenger.price)
  // @ts-ignore
    .reduce((acc, price) => Number.parseInt( acc) + Number.parseInt(price));
 

}