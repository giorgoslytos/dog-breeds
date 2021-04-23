import { Pipe, PipeTransform } from '@angular/core';
import { DogCeoBreedsListObj } from '../interfaces/DogCeoBreedsListObj';

@Pipe({
  name: 'getBreedName',
})
export class GetBreedNamePipe implements PipeTransform {
  transform(
    subBreed: string,
    breedList: DogCeoBreedsListObj,
    selectedBreeds?: string[]
  ): string {
    return selectedBreeds
      ? selectedBreeds
          .map((x) => (breedList.message[x].includes(subBreed) ? x : ''))
          .reduce((acc, curr) => acc || curr, '')
      : '';
  }
}
