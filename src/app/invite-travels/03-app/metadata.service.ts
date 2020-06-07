import { Injectable, OnDestroy, Injector } from "@angular/core";
import { ITravelMetadata, IGranularMetadata } from "../../../../../../pych/pych-admin/src/app/admin/interfaces/i-travel-metadata";
import * as dayjs from 'dayjs';
import  * as utc from 'dayjs/plugin/utc';
import { StateLogin } from 'src/app/infrastructure/ngrx-store/login/login.reducers';
import { Store, select } from '@ngrx/store';
import {  selectAgentEmailName } from 'src/app/infrastructure/ngrx-store/login/login.selectors';
import { Subscription } from 'rxjs';
dayjs.extend(utc)
@Injectable({ providedIn: 'root' })
export class MetadataTravels implements OnDestroy {


  email:string;
  displayName:string;
  agentData:Subscription
  constructor(
    private store: Store<StateLogin>

  ) { 
    this.setAgentData();
  }

  setAgentData(){
   this.agentData=  this.store.pipe(select(selectAgentEmailName))
    .subscribe(data=>{
      this.email=data.email; this.displayName=data.displayName
    })
  }

  createGranularMetadata(): IGranularMetadata {

    return { email: this.email, name: this.displayName, unixDate: dayjs.utc().valueOf() }
  }
  create(): ITravelMetadata {

    const  creator :IGranularMetadata = this.createGranularMetadata();

    return {
      editors:[creator],
      createdBy: creator,
    }
  }

 
  update(metadata: ITravelMetadata): ITravelMetadata {

   

    const currentEditor = this.createGranularMetadata();

    return {
      ...metadata,
      editors: [...metadata.editors, currentEditor]
    };
  }

  delete   (metadata: ITravelMetadata): ITravelMetadata {
    const updated = this.update(metadata)
    return {
      ...updated,
      deletedBy:updated.editors[updated.editors.length-1]
    };
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.agentData.unsubscribe()
    
  }



}