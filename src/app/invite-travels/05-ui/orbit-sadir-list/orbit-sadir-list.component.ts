import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { IOrbit } from '../../../../../../../pych/pych-admin/src/app/admin/interfaces/IOrbit';
import { Observable } from 'rxjs';
import { ISelectList } from '../../03-app/invite-travel.util';
import { selectOrbits, selectOrbitsSadir } from 'src/app/infrastructure/ngrx-store/orbits/orbits.selectors';
import { map } from 'rxjs/operators';
import { MatSelectionList, MatListOption } from '@angular/material';
import { Store } from '@ngrx/store';
import { StateOrbits } from 'src/app/infrastructure/ngrx-store/orbits/orbits.reducers';
import { SelectionModel } from '@angular/cdk/collections';
import { IOrbitSadir } from '../../../../../../../pych/pych-admin/src/app/admin/interfaces/orbit-sadir';

@Component({
  selector: 'app-orbit-sadir-list',
  templateUrl: './orbit-sadir-list.component.html',
  styleUrls: ['./orbit-sadir-list.component.css']
})
export class OrbitSadirListComponent implements OnInit {

  @Output() selectedOrbit = new EventEmitter<IOrbitSadir>();

  orbits$: Observable<ISelectList<IOrbitSadir>[]> = this.store.select(selectOrbitsSadir).pipe(map(orbits =>
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

  createOrbitLabel(orbit: IOrbitSadir): string {

    return `${orbit.name} ${orbit.hour}:${orbit.minutes}`
  }

  orbitChange(orbit: IOrbitSadir) {
    this.selectedOrbit.emit(orbit);
  }



}
