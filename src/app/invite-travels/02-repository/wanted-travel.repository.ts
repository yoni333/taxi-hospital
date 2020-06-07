import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { IPrivateTravel } from 'src/app/travels/01-domain/private-travels.interface';
import { ISadirTravel } from 'src/app/travels/01-domain/sadir-travels.interface';

@Injectable()
export class WantedTravels{
  wantedPrivatePath:string = 'companies/pych/wantedTravelsAgents';
  constructor(
    private afs:AngularFirestore
  ){}

  addWanted(travel:IPrivateTravel|ISadirTravel):Promise<void>{

    console.log('travel',travel);
        const pushKey = this.afs.createId();
    travel.id=pushKey
    return this.afs.collection(this.wantedPrivatePath).doc(travel.id).set(travel)
  }

  fetchWantedTravels(){

  }

}