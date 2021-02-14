import { Observable } from 'rxjs';
import { DogImageState } from './DogImageState.interface';
import { DogInfoState } from './DogInfoState.interface';

export interface DogsAllInfo {
  dogImageState: Observable<DogImageState>;
  dogInfoState: Observable<DogInfoState>;
}
