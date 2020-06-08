import { Pipe, PipeTransform } from '@angular/core';
import { EDirection } from '../../01-domain/invite.interface';

@Pipe({
  name: 'directionHebrew'
})
export class DirectionPipe implements PipeTransform {

  transform(value: string): string {
    if (value === EDirection.toHome) {
        return 'פיזור'
    }
    if (value === EDirection.toWork) {
      return 'איסוף'
    }
    return value;
  }

}
