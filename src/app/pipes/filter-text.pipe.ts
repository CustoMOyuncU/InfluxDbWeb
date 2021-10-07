import { Pipe, PipeTransform } from '@angular/core';
import { Temperature } from '../models/temperature';

@Pipe({
  name: 'filterText'
})
export class FilterTextPipe implements PipeTransform {

  transform(value: Temperature[], filterText: string): Temperature[] {
    filterText = filterText?filterText.toLowerCase():""
    return filterText?value.filter((t:Temperature)=>t.time.toLowerCase().indexOf(filterText)!==-1):value
  }

}
