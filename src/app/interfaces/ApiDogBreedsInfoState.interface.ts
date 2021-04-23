import { ContentState } from '../types/ContentState';
import { ApiDogBreedsInfo } from './ApiDogBreedsInfo.interface';

export interface ApiDogBreedsInfoState {
  state: ContentState;
  item?: ApiDogBreedsInfo;
  error?: string;
}
