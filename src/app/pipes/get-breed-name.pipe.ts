import { Pipe, PipeTransform } from '@angular/core';
import { BreedList } from '../interfaces/BreedList.interface';

@Pipe({
  name: 'getBreedName',
})
export class GetBreedNamePipe implements PipeTransform {
  transform(
    subBreed: string,
    breedList: BreedList,
    selectedBreeds?: string[]
  ): string {
    return selectedBreeds
      .map((x) => (breedList.message[x].includes(subBreed) ? x : ''))
      .reduce((acc, curr) => acc || curr);
  }
}
