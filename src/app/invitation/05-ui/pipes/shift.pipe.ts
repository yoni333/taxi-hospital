import { Pipe, PipeTransform } from '@angular/core';
import { EShift } from '../../01-domain/invite.interface';

@Pipe({
  name: 'shiftHebrew'
})
export class ShiftPipe implements PipeTransform {

  transform(value: string): string {
    if (value===EShift.first){return "בוקר"}
    if (value===EShift.second){return "ערב"}
    if (value===EShift.third){return "לילה"}
    return value;
  }

}
