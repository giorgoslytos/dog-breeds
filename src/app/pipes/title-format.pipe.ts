import { Pipe, PipeTransform } from '@angular/core';
import { ApiDogBreedsInfo } from '../interfaces/ApiDogBreedsInfo.interface';

@Pipe({ name: 'titleFormat' })
export class TitleFormatPipe implements PipeTransform {
  transform(value: ApiDogBreedsInfo[]): string {
    return value[0].breedName
      .split(' ')
      .map((x: string) => x[0].toUpperCase() + x[0].slice(1))
      .join(' ');
  }
}
