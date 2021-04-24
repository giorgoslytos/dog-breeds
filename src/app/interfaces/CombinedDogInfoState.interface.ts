import { Observable } from 'rxjs';
import { DogCeoImageState } from './DogCeoImageState.interface';
import { ApiDogBreedsInfoState } from './ApiDogBreedsInfoState.interface';

export interface CombinedDogInfoState$ {
  dogImageState$: Observable<DogCeoImageState>;
  dogInfoState$: Observable<ApiDogBreedsInfoState>;
}
