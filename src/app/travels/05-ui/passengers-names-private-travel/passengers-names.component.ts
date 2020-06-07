import { Component, OnInit } from '@angular/core';
import { PrivateTravelsService } from '../../03-app/private-travels.service';
import { Observable, EMPTY, MonoTypeOperatorFunction, OperatorFunction } from 'rxjs';
import { map, pluck, catchError, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { IOrbitTranslate } from '../../01-domain/orbit-translate.interface';
import { ETravelType } from '../../../shared/travel-type.enum';
import { SadirTravelsService } from '../../03-app/sadir-travels.service';
import { IPassenger } from '../../01-domain/sadir-travels.interface';

@Component({
  selector: 'app-passengers-names',
  templateUrl: './passengers-names.component.html',
  styleUrls: ['./passengers-names.component.css']
})
export class PassengersNamesComponent implements OnInit {
  public travelType = ETravelType;
  type = '';
  passengers: Observable<string[]>;
  orbitNames: Observable<IOrbitTranslate>;
  constructor(
      private travelService: PrivateTravelsService
    , private sadirService: SadirTravelsService
    , private activeRoute: ActivatedRoute
    , private route: Router

  ) { }

  ngOnInit() {
    this.travelService.getCurrentPrivateTravel().subscribe(console.log);

    this.getTravelData();

  }

  getTravelData() {
    this.type = this.activeRoute.snapshot.params.type;
    console.log('activeRoute.snapshot.params', this.activeRoute.snapshot.params);
    if (this.type ===ETravelType.private) {
        this.getPrivateData();
    }
    if (this.type ===ETravelType.sadir) {
        this.getSadirData();
    }
  }



  getSadirData() {
    this.passengers = this.sadirService.getCurrentSadirTravel().pipe(
      map(travel => travel.passengers.map((passenger: IPassenger) => passenger.name))
     , this.handleError<string[]>()
     );

    this.orbitNames = this.sadirService.getCurrentSadirTravel().pipe(
      map( (travel): IOrbitTranslate => ({
        orbitDescripionHebrew: travel.orbit.name
        , orbitDescripionEnglish: travel.orbit.code
      })
      )
    // ,this.handleError<IOrbitTranslate>()
      );


  }
  getPrivateData() {
    this.passengers = this.travelService.getCurrentPrivateTravel().pipe(
      map(travel => [travel.nameOfCustomer])
     , this.handleError<string[]>()
     );

    this.orbitNames = this.travelService.getCurrentPrivateTravel().pipe(
      map( (travel): IOrbitTranslate => ({
        orbitDescripionHebrew: travel.orbit.orbitDescripionHebrew
        , orbitDescripionEnglish: travel.orbit.orbitDescripionEnglish
      })
      )
    // ,this.handleError<IOrbitTranslate>()
      );


  }

  handleError<T>(): OperatorFunction<T, any> {

    return catchError((e): Observable<any> => {
      this.navigateOnError();
      return EMPTY;
    }
    );

  }
  navigateOnError() {
    // TODO add this string to vocalbery

    alert('didnt find passengers names');
    this.route.navigate(['/next-travels']);
  }
}
