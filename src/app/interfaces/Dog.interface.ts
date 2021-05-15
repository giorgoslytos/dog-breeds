import { ContentState } from '../types/ContentState';
import { ApiDogBreedsInfo } from './ApiDogBreedsInfo.interface';

export interface Dog {
  state: ContentState;
  title?: string;
  image?: string;
  dogInfo?: { info?: ApiDogBreedsInfo; state: ContentState };
  error?: string;
}
