import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ISelectList } from '../../03-app/invite-travel.util';
import { IOrbit } from '../../01-domain/orbits-interface';
import { MatSelectionList, MatListOption } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { StateOrbits } from 'src/app/infrastructure/ngrx-store/orbits/orbits.reducers';
import { Store } from '@ngrx/store';
import { selectOrbits, selectStartLocations } from 'src/app/infrastructure/ngrx-store/orbits/orbits.selectors';
import { map, tap } from 'rxjs/operators';
import { IStartLocation } from '../../01-domain/start-location.interface';

@Component({
  selector: 'app-orbit-private-list',
  templateUrl: './orbit-private-list.component.html',
  styleUrls: ['./orbit-private-list.component.css']
})
export class OrbitPrivateListComponent implements OnInit {

  @Output() selectedOrbit = new EventEmitter<IOrbit>();

  orbits$: Observable<ISelectList<IOrbit>[]> = this.store.select(selectOrbits).pipe(map(orbits =>
    orbits.map(orbit => ({ value: orbit, label: this.createOrbitLabel(orbit) })))
    // ,tap(console.log)
  );
  
  @ViewChild(MatSelectionList, { static: true }) private selectionList: MatSelectionList;

  constructor(
    private store: Store<StateOrbits>

  ) { }

  ngOnInit() {
    this.selectionList.selectedOptions = new SelectionModel<MatListOption>(false);

  }

  createOrbitLabel(orbit: IOrbit): string {

    return `${orbit.orbitDescripionHebrew}`
  }

  orbitChange(orbit: IOrbit) {
    this.selectedOrbit.emit(orbit);
  }


}
