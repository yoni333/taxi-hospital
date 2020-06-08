import { Component, OnInit } from '@angular/core';
import { IAdminInvitationService } from '../../03-app/admin-invite.service';
import { Observable } from 'rxjs';
import { IInvitation, EDirection, EShift } from '../../01-domain/invite.interface';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  travels$: Observable<Array<IInvitation[]>>
  constructor(
    private adminService: IAdminInvitationService
  ) { }

  ngOnInit() {
    this.travels$ = this.adminService.getAllInvitation().pipe(
      map(travels => {
        let travelsByDates: {} = {};

        travels.forEach(travel => {
          if (travelsByDates[travel.date] === undefined) {
            travelsByDates[travel.date] = {}
          }
          if (travelsByDates[travel.date][travel.shift] === undefined) {
            travelsByDates[travel.date][travel.shift] = {}
          }
          if (travelsByDates[travel.date][travel.shift][travel.direction] === undefined) {
            travelsByDates[travel.date][travel.shift][travel.direction] = []
          }
          // console.log(travelsByDates);



          travelsByDates[travel.date][travel.shift][travel.direction].push(travel)
        })

        console.log(travelsByDates);

        return this.convertTreeToArray(travelsByDates)
      })
    )
  }

  convertTreeToArray(tree: {}): Array<IInvitation[]> {
    // let shiftArr= [EShift.first,EShift.second,EShift.third]
    // let directionArr= [,EDirection.toHome,EDirection.toWork]
    let dataAsArray = [];
    let datesKeys = Object.keys(tree);
    datesKeys.forEach(day => {

      let shiftKeys = Object.keys(tree[day]);
      let shiftArr = []
      shiftKeys.forEach(shift => {

        let directionKeys = Object.keys(tree[day][shift]);
        let directionArr:{data: IInvitation[] ,metadata:{}}[] = []
        directionKeys.forEach(direction => {

          // console.log(day, shift, direction);
          // console.log(tree[day][shift][direction]);

          directionArr.push( {

            data:tree[day][shift][direction],
            metadata:{day,shift,direction}
          }) 
        })
        if (directionArr.length > 0) {

          shiftArr.push(directionArr)
        }

      })
      if (shiftArr.length > 0) {

        dataAsArray.push(shiftArr)
      }
    })
    console.log('dataAsArray',dataAsArray);
    

    return dataAsArray

  }

}
