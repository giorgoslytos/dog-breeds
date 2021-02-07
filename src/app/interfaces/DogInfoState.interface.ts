import { ContentState } from '../types/ContentState';
import { DogInfo } from './DogInfo.interface';

export interface dogInfoState {
  state: ContentState;
  item?: DogInfo;
  error?: string;
}
