import { ContentState } from '../types/ContentState';
import { DogInfo } from './DogInfo.interface';

export interface DogInfoState {
  state: ContentState;
  item?: DogInfo;
  error?: string;
}
