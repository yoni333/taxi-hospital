import { Component, OnInit } from '@angular/core';
import { InvitationService } from '../../../03-app/invite.service';
import { Observable } from 'rxjs';
import { IInvitation, EShift, EDirection } from '../../../01-domain/invite.interface';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';
import { ItravelDetail } from '../../../01-domain/travel-detail.interface';

@Component({
  selector: 'app-next-travels',
  templateUrl: './next-travels.component.html',
  styleUrls: ['./next-travels.component.css']
})
export class NextTravelsComponent implements OnInit {

  invitation: Observable<ItravelDetail[]>;
  constructor(private invitationService: InvitationService) { }

  ngOnInit() {

    this.invitation = this.getInvitations();
  }

  getInvitations(): Observable<ItravelDetail[]> {
    return this.invitationService.getUserInvitations().pipe(
      map(travels => travels.map(travel => ({
        id: travel.id,
        date: this.formatDate(travel.date),
        direction: this.formatDirection(travel.direction),
        shift: this.formatShift(travel.shift)
      })
      ))
    );
  }
  formatDate(unixDate: number): string {
    return dayjs(unixDate).format('YYYY/MM/DD');
  }
  formatShift(shift: string): string {
    if (shift === EShift.first) { return 'בוקר'; }
    if (shift === EShift.second) { return 'ערב'; }
    if (shift === EShift.third) { return 'לילה'; }
  }
  formatDirection(direction: string): string{
    if (direction === EDirection.toHome) {return 'פיזור'; }
    if (direction === EDirection.toWork) {return 'איסוף'; }
  }

  deleteTravel(id: string){
    if ( !confirm('לבטל הזמנת נסיעה ?')) {return; }
    this.invitationService.deleteTravel(id);
  }
}
