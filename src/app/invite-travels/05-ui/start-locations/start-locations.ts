import { Component, OnInit, Output, EventEmitter, ViewChild, ChangeDetectionStrategy } from "@angular/core";
import { IStartLocation } from '../../01-domain/start-location.interface';
import { Observable } from 'rxjs';
import { ISelectList } from '../../03-app/invite-travel.util';
import { selectStartLocations } from 'src/app/infrastructure/ngrx-store/orbits/orbits.selectors';
import { map } from 'rxjs/operators';
import { MatSelectionList, MatListOption } from '@angular/material';
import { Store } from '@ngrx/store';
import { StateOrbits } from 'src/app/infrastructure/ngrx-store/orbits/orbits.reducers';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-start-location-list',
  template: `<div class="mat-list-box">

  <mat-selection-list class="" required (selectionChange)="startLocationChange($event.option.value)" multiple="false">
    <ng-container *ngFor="let startLocation of startLocations$|async">

      
      <mat-list-option [value]="startLocation.value">{{startLocation.label}}</mat-list-option>
      <mat-divider></mat-divider>
    </ng-container>
   
  </mat-selection-list>
</div>
`,
  styleUrls: ['../orbit-private-list/orbit-private-list.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush,

})

export class StartLocationsComponent implements OnInit{

  @Output() selectedStartLocation = new EventEmitter<IStartLocation>();

  startLocations$: Observable<ISelectList<IStartLocation>[]> = this.store.select(selectStartLocations).pipe(map(startLocations =>
    startLocations.map(startLocation => ({ value: startLocation, label: `${startLocation.hebrewCity} ${startLocation.hebrewAdress} `})))
    // ,tap(console.log)
  );

  
  @ViewChild(MatSelectionList, { static: true }) private selectionList: MatSelectionList;

  constructor(
    private store: Store<StateOrbits>

  ) { }

  ngOnInit() {
    this.selectionList.selectedOptions = new SelectionModel<MatListOption>(false);

  }


  startLocationChange(startLocation: IStartLocation) {
    this.selectedStartLocation.emit(startLocation);
  }


}